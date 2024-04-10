'use client'
import { Img } from 'next-cloudimage-responsive'

type Props = {
  src: string
  alt?: string
  height?: string
  width?: string
  className?: string
  params?: string
}

const NextCloudImage = (props: Props) => {
  return (
    <div className={props.className}>
      <Img src={props.src} alt={props.alt} height={300} width={300} objectFit='cover' params='func=cropfit&gravity=smart&aspect_ratio=1' />
    </div>
  )
}

export default NextCloudImage
