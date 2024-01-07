import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'
import { MdOutlineCancel } from 'react-icons/md'
import { BsFillPlayFill } from 'react-icons/bs'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import axios from 'axios'
import { BASE_URL } from '../../utils'
import { Video } from '../../types'
import useAuthStore from '../../store/authStore'
import LikeButton from '../../components/LikeButton'
import Comments from '../../components/Comments'

interface IProps {
  postDetails: Video;
}

const Detail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails)
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoMuted, setIsVideoMuted] = useState(false)
  const router = useRouter();
  const { userProfile }:any = useAuthStore()
  const [comment, setComment] = useState('')
  const [isPostingComment, setIsPostingComment] = useState(false)

  const onVideoClick = () => {
    if(playing) {
      videoRef?.current?.pause()
      setPlaying(false)
    } 
    else {
      videoRef?.current?.play()
      setPlaying(true)
    }
  }

  useEffect(() => {
    if(post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted
    }
  }, [post, isVideoMuted])

  const handleLike = async (like: boolean) => {
    if(userProfile) {
      const { data } = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like
      })

      setPost({ ...post, likes: data.likes })
    }
  }

  const addComment = async (e: any) => {
    e.preventDefault()

    if(userProfile && comment) {
      setIsPostingComment(true)

      const { data } = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment
      })

      setPost({ ...post, comments: data.comments })
      setComment('')
      setIsPostingComment(false)
    }
  }

  if(!post) return null

  return (
<div className="tv-mode">
    <div className="post" tabIndex={1}>
        <div className="video-container continuous" style={{ height: '820px', width: '820px' }}>
            <div className="vine-player">
                <div data-ember-action="495" className="vine-video-container">
                    <video preload="auto" width="820" height="820" ref={videoRef} loop autoPlay onClick={onVideoClick} src={post.video.asset.url}></video>
                </div>
        <div>
          {isVideoMuted ? (
            <a onClick={() => setIsVideoMuted(false)}>
              <div className='vine-audio off' />
            </a>
          ) : (
            <a onClick={() => setIsVideoMuted(true)}>
              <div className='vine-audio on' />
            </a>
          )}         
        </div>				
            </div>
        </div>

        <div className="vine-metadata">
            <div className="metadata-wrapper">
                <div className="post-info-container">
                    <div className="fullscreen-header">
                        <h2 className="timeline-name">
                            <div className="icon" style={{ backgroundImage: "url('/images/sidebar/explore.svg')", backgroundSize: '50%' }}></div>
                            <span>Explore Vine</span>
                        </h2>
                    </div>

                    <div className="share-close" onClick={() => router.back()}>
                        <div className="icon-close_x"></div>
                    </div>

                    <div className="user-info-new user-info-size-38 user-info-hide-metadata user-info-inherit-color user-info-stacked">
                        <div className="avatar-new">
                            <span>
							<Link href={`/profile/${userProfile._id}`}>
								<>
									<img 
										src={post.postedBy.image}
										alt='profile photo'
										layout='responsive'
									/>
								</>
							</Link>
                            </span>
                        </div>
                        <div className="username">
                            <span><a href={`/profile/${userProfile._id}`}> {post.postedBy.userName} </a></span><GoVerified className='icon-verified'/>
                        </div>
                        <div className="post-metadata">
                            <span className="time">
                                <div>Apr 2, 2015</div>
                            </span>
                        </div>
                    </div>

                    <h2 className="description"><span>{post.caption}</span></h2>
                    <h5>
                        <span className="time">
                            <div>Apr 2, 2015</div>
                        </span>
                    </h5>
                </div>
                <div className="fullscreen-actions">
                    <div className="action like">
						<>{userProfile &&(
							<LikeButton 
								likes = { post.likes }
								handleLike={() => handleLike(true)}
								handleDislike={() => handleLike(false)}
							/>
						)}</>
                    </div>
                </div>

                <div className="active">
                    <div className="logo">
                        <div className="icon-vine_logo"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export const getServerSideProps = async ({ 
  params: { id } 
} : {
  params: { id: string }
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`)

  return {
    props: { postDetails: data }
  }
}

export default Detail