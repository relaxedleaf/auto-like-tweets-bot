import * as dotenv from 'dotenv';

import Twitter, { ApiResponseError, TweetV2, UserV1 } from 'twitter-api-v2';

import ProcessStatus from './types/ProcessStatus';
import searchWords from './constants/searchWords';

dotenv.config();

const twitterClient = new Twitter({
	appKey: process.env.CONSUMER_KEY!,
	appSecret: process.env.CONSUMER_SECRET!,
	accessToken: process.env.ACCESS_TOKEN!,
	accessSecret: process.env.ACCESS_TOKEN_SECRET!,
}).readWrite;
let me: UserV1;
let nextReset = 0;
let totalLiked = 0;
let prevProcessFinished = false;
let searchWordIndex = 0;

const main = async () => {
	updateProcessStatus(ProcessStatus.STARTED);
	try {
		// Get current time in milliseconds
		const now = new Date().getTime();
		if (now <= nextReset) {
			updateProcessStatus(ProcessStatus.FINISHED);
			return;
		}

		// Fetch authenticated user
		me = await twitterClient.currentUser();

		// Fetch tweets data
		const searchWord = getSearchWord();
		const tweets = await twitterClient.v2.search({
			query: searchWord,
			sort_order: 'recency',
		});

		// Get remaining API calls count and the next reset time in seconds
		let { remaining, reset } = tweets.rateLimit;
		nextReset = reset * 1000; //Cache the next reset time

		// Keep on fetching tweet and liking it until no remaining API calls are left
		for await (const tweet of tweets) {
			let err: any = null;
			// Currently the Like API only provides 50 calls per 15 minutes and might throw service not avaliable error
			try {
				await like(tweet);
			} catch (err1) {
				console.log(err1);
				err = err1;
				if (
					err &&
					err instanceof ApiResponseError &&
					err.code === 403
				) {
					continue;
				}
				while (
					err &&
					err instanceof ApiResponseError &&
					err.code === 503
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
				if (err) {
					updateProcessStatus(ProcessStatus.FINISHED);
					return;
				}
			}

			if (remaining <= 0) {
				updateProcessStatus(ProcessStatus.FINISHED);
				return;
			}
			remaining--;
		}
	} catch (err) {
		console.error(err);
		updateProcessStatus(ProcessStatus.FINISHED);
	}
	updateProcessStatus(ProcessStatus.FINISHED);
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

//Wait 2 minutes
function wait(): Promise<boolean> {
	return new Promise((res, rej) => {
		console.log('Waiting for 2 minutes');
		setTimeout(() => {
			res(true);
		}, 120000);
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

main();
setInterval(() => {
	if (prevProcessFinished) {
		main();
	}
}, 960000); //16 minutes (Twitter refreshes every 15 minute)
