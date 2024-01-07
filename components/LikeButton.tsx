import React, { useState, useEffect } from 'react'
import { MdFavorite } from 'react-icons/md'

import useAuthStore from '../store/authStore'

interface IProps {
    handleLike: () => void
    handleDislike: () => void
    likes: any[]
}

const LikeButton = ({ handleLike, handleDislike, likes }: IProps) => {
    const [alreadyLiked, setAlreadyLiked] = useState(false)
    const { userProfile }: any = useAuthStore()
    const filterLikes = likes?.filter((item) => item._ref === userProfile?._id)

    useEffect(() => {
        if (filterLikes?.length > 0) {
            setAlreadyLiked(true)
        }
        else {
            setAlreadyLiked(false)
        }
    }, [filterLikes, likes])
    

  return (
    <div>
            {alreadyLiked ? (
                <div className='icon_liked text-[#00b487]' onClick={handleDislike}>
                    <MdFavorite className='text-lg md:text-2xl' />
                </div>
            ) : (
                <div className='icon_like' onClick={handleLike}>
                    <MdFavorite className='text-lg md:text-2xl' />
                </div>
            )}
            <p className='text-md font-semibold'style={{ marginTop: "-30px", marginLeft: "32px" }}>
                {likes?.length | 0}
            </p>
    </div>
  )
}

export default LikeButton