import { shuffle } from '../utils/ArrayUtils';

const programmingLanguages = [
	'Golang',
	'HTML',
	'CSS',
	'Solidity',
	'Swift Programming',
	'Rustlang',
	'C#',
	'C++',
	'Nodejs',
	'Python Programming',
	'Java Programming',
	'TypeScript',
	'JavaScript',
	'PHP Programming',
];

const databases = ['MySQL', 'PostgreSQL', 'MongoDB'];

const frameworks = [
	'Laravel',
	'ReactJS', //Could be library :) Ik
	'SvelteJS',
	'EmberJS',
	'Vue',
	'AngularJS',
	'Wordpress',
	'NextJS',
	'Backstage.io',
];

const libraries = ['Material UI', 'Redux', 'Tailwind', 'JQuery'];

const ides = ['Andriod Studio', 'VS Code'];

const hotTopics = [
	'Web3',
	'Full Stack',
	'Web Component',
	'AI',
	'OpenAI',
	'ChatGPT',
	'Artificial Intelligence',
	'FANNG',
	'Data Structure',
	'Algorithms',
	'Machine Learning',
	'LearnWeb3DAO',
	'Frontend',
	'Backend',
	'JSON',
	'Linux',
	'NFT',
	'Ethereum',
	'BNB',
	'100DaysOfCode',
	'LeetCode',
	'BigData',
	'Blockchain',
];

const designTools = ['Figma', 'Photoshop'];

const devOps = [
	'Docker',
	'Kubernetes',
	'Azure',
	'AWS',
	'CI/CD',
	'GitHub',
	'GitLab',
	'MicroServices',
];

const searchWords = shuffle(
	[
		programmingLanguages,
		databases,
		frameworks,
		libraries,
		ides,
		hotTopics,
		designTools,
		devOps,
	].flat()
);

export default searchWords;
