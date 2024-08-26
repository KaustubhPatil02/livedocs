import { useOthers } from '@liveblocks/react/suspense';
import Image from 'next/image';
import React from 'react'

const ActiveCollabs = () => {
  const others = useOthers();
  const collaborators = others.map((other) => other.info);
  return (
    <ul className='collaborators-list'>
      {collaborators.map(({ id, avatar, name, color, }) =>
        <li key={id}>
          <Image
            className='inline-block size-8 rounded-full ring-2 ring-dark-400'
            style={{ border: `2px solid ${color}` }}
            src={avatar}
            alt={name}
            width={100}
            height={100}
          />
        </li>
      )}
    </ul>
  )
}

export default ActiveCollabs