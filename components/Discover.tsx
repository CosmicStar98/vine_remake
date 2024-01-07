import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { topics } from '../utils/constants'

const Discover = () => {
  const router = useRouter()
  const { topic } = router.query

  const activeTopicStyle = 'xl:border-2 hover:bg-primary xl:border-[#00b487] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#00b487]'

  const topicStyle = 'xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[]'

  return (
    <div>
      <h3 className="channel-module-name module-title">Channels</h3>
      <div className="channels-container">
        {topics.map((item) => (
          <Link href={`/?topic=${item.name}`} key={item.name}>
              <div className={`channel-badge bg-[#${item.color}]`} style={{ backgroundColor: `#${item.color}` }} alt={item.name_fancy}>
                <img className="icon" src={`/images/channels_v2/${item.icon}@2x.png`} alt={item.name_fancy} />
              </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Discover