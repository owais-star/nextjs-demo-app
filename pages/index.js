import React from "react";
import Box from "@mui/material/Box";
import PostCard from "../components/post/index";
import Grid from "@mui/material/Grid";
import { baseUrl } from "../constants/ApiUrl";

export default function Home({ posts }) {

  return (
    <Box style={{ marginTop: "60px", padding: "20px" }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <PostCard posts={posts} />
      </Grid>
    </Box>
  );
}
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch(`${baseUrl}/api/getposts`);
  const data = await res.json();
  const posts = data.data;

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
}
