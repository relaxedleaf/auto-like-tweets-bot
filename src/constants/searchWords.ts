import { shuffle } from '../utils/ArrayUtils';

const programmingLanguages = [
	'Golang',
	'HTML',
	'CSS',
	'Solidity',
	'Swift Programming',
	'Rustlang',
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
	'NextJS',
	'Backstage.io',
];

const libraries = ['Material UI', 'Redux', 'Tailwind', 'JQuery'];

const ides = ['Andriod Studio', 'VS Code'];

const hotTopics = [
	'Web3',
	'Full Stack',
	'Web Component',
	'OpenAI',
	'ChatGPT',
	'Artificial Intelligence',
	'FANNG',
	'Data Structure',
	'Machine Learning',
	'LearnWeb3DAO',
	'Linux',
	'100DaysOfCode',
	'LeetCode',
	'BigData',
	'Blockchain',
	'Firebase',
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
