import type { NextPage } from 'next'
import Head from 'next/head'
import DocumentMeta from 'react-document-meta';
import axios from 'axios'

import { Video } from '../types'
import VideoCard from '../components/VideoCard'
import NoResults from '../components/NoResults'
import { BASE_URL } from '../utils'

interface IProps {
  videos: Video[]
}

const meta = {
  title: 'Vine by Twitter',
  description: 'Vine is the best way to see and share life in motion. Create short, beautiful, looping videos in a simple and fun way for your friends and family to see.',
  canonical: 'http://localhost:3000',
  meta: {
    charset: 'utf-8',
    name: {
      keywords: 'vine,vineapp'
    }
  }
}

const Home: NextPage<IProps> = ({ videos }) => {
  return (
    <div className='flex flex-col gap-10 videos h-full'>
      <Head>
        <title>Home — Vine</title>
        <script src="/js/vine_remake.js"></script>
        <DocumentMeta {...meta} />
      </Head>
      {videos.length ? (
        videos.map((video: Video) => (
          <VideoCard post={video} key={video._id} />
        ))
      ) : (
        <NoResults text={'No Videos :('} />
      )}
    </div>
  )
}

export const getServerSideProps = async ({
  query: { topic }
}: {
  query: { topic: string }
}) => {
  let response = null;
  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`)
  } else {
    response = await axios.get(`${BASE_URL}/api/post`)
  }

  return {
    props: {
      videos: response.data
    }
  }
}

export default Home