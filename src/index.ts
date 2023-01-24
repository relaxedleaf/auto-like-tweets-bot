import * as dotenv from 'dotenv';

import Twitter, { ApiResponseError, TweetV2, UserV1 } from 'twitter-api-v2';
import {addMilliseconds, format} from 'date-fns';

import ProcessStatus from './types/ProcessStatus';
import searchWords from './constants/searchWords';
import { timezonedDate } from './utils/DateUtil';

dotenv.config();

const twitterClient = new Twitter({
	appKey: process.env.CONSUMER_KEY!,
	appSecret: process.env.CONSUMER_SECRET!,
	accessToken: process.env.ACCESS_TOKEN!,
	accessSecret: process.env.ACCESS_TOKEN_SECRET!,
}).readWrite;
let me: UserV1;
let totalLiked = 0;
let prevProcessFinished = false;
let searchWordIndex = 0;

const main = async () => {
	updateProcessStatus(ProcessStatus.STARTED);
	try {
		// Fetch authenticated user
		me = await twitterClient.currentUser();

		// Fetch tweets data
		const searchWord = getSearchWord();
		const tweets = await twitterClient.v2.search({
			query: searchWord,
			sort_order: 'recency',
		});

		// Keep on fetching tweets if there are 403 & 503 errors
		for await (const tweet of tweets) {
			let err: any = null;
			try {
				await like(tweet);
			} catch (err1) {
				console.log(err1);
				err = err1;
				if (
					err &&
					err instanceof ApiResponseError &&
					err.code === 403 &&
					err.data.detail === 'You cannot like a Tweet that has been edited.'
				) {
					continue;
				}
				while (
					err &&
					err instanceof ApiResponseError &&
					err.code === 503 //Service unavaliable
				) {
					try {
						await wait();
						await like(tweet);
						err = null;
					} catch (err2) {
						err = err2;
						console.error(err);
					}
				}
				updateProcessStatus(ProcessStatus.FINISHED);
				break;
			}
			updateProcessStatus(ProcessStatus.FINISHED);
			break;
		}
	} catch (err) {
		console.error(err);
		updateProcessStatus(ProcessStatus.FINISHED);
	}
};

function getSearchWord(): string {
	const searchWord = searchWords[searchWordIndex];

	if (searchWordIndex + 1 >= searchWords.length) {
		searchWordIndex = 0;
	} else {
		searchWordIndex++;
	}

	console.log(searchWord);
	return searchWord.toLowerCase();
}

async function like(tweet: TweetV2) {
	const {
		data: { liked },
	} = await twitterClient.v2.like(me.id_str, tweet.id);
	handleIncrementLikes(liked);
}

//Wait 5 minutes
function wait(): Promise<boolean> {
	return new Promise((res, rej) => {
		console.log('Waiting for 5 minutes');
		setTimeout(() => {
			res(true);
		}, 300000);
	});
}

function handleIncrementLikes(liked: boolean) {
	console.log({
		'#': totalLiked,
		liked,
	});
	totalLiked++;
}

function updateProcessStatus(status: ProcessStatus) {
	if (status == ProcessStatus.FINISHED) {
		prevProcessFinished = true;
		console.log('Process Finished');
	} else {
		prevProcessFinished = false;
		console.log('Process Started');
	}
}

console.log(searchWords);
main();
setInterval(() => {
	let delay = Math.floor(Math.random() * (45 + 1)); //0 - 45 minutes
	console.log(`Waiting ${delay} mins`);
	delay *= 60000;
	const nextExecutation = format(timezonedDate(addMilliseconds(new Date(), delay)), 'M/d/yyyy hh:mm a');
	console.log(`Will execute in: ${nextExecutation}`);

	if (prevProcessFinished) {
		setTimeout(() => {
			main();
		}, delay);
	}
}, 900000); //15 minutes