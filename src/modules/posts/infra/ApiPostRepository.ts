import { Post } from '../domain/Post';
import { PostRepository } from '../domain/PostRepository';

const JSONPLACEHOLDER_URL = 'https://jsonplaceholder.typicode.com';

export function createApiPostRepository(): PostRepository {
	const cache = new Map<number, Post>();

	async function get(postId: number): Promise<Post> {
		if (cache.has(postId)) {
			return cache.get(postId) as Post;
		}

		const response = await fetch(`${JSONPLACEHOLDER_URL}/posts/${postId}`);
		const post = await response.json();
		cache.set(postId, post);

		return post;
	}

	async function getAllWithPagination(
		limit: number,
		page: number,
	): Promise<Post[]> {
		const offset = (page - 1) * limit;
		const response = await fetch(
			`${JSONPLACEHOLDER_URL}/posts?_start=${offset}&_limit=${limit}`,
		);
		const posts = await response.json();

		return posts;
	}

	async function getAll(): Promise<Post[]> {
		if (cache.size > 0) {
			return Array.from(cache.values());
		}

		const response = await fetch(`${JSONPLACEHOLDER_URL}/posts`);
		const posts = await response.json();

		posts.forEach((post: Post) => cache.set(post.id, post));

		return posts;
	}

	async function getByUser(userId: number): Promise<Post[]> {
		if (cache.size > 0) {
			return Array.from(cache.values()).filter(post => post.userId === userId);
		}

		const response = await fetch(
			`${JSONPLACEHOLDER_URL}/users/${userId}/posts`,
		);
		const posts = await response.json();

		posts.forEach((post: Post) => cache.set(post.id, post));

		return posts;
	}

	return {
		get,
		getAllWithPagination,
		getAll,
		getByUser,
	};
}
