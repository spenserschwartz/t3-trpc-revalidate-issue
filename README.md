# t3-trpc-revalidate-issue.git

## Steps to reproduce

1. Update DATABASE_URL in .env, npm i, npm run dev
2. Make a few posts from '/' (T3 stack home page)
3. Visit '/all-posts' and see all posts
4. Click on post and rename post
5. Navigate back to '/all-posts' server component to see that redirect/revalidate/invalidate does not update data
