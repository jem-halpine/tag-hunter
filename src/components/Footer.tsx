import { MdCopyright } from 'react-icons/md'
import { FaFacebook } from 'react-icons/fa'
import { FaDiscord } from 'react-icons/fa6'
import { FaInstagram } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa'

export default function Footer() {
  //  TODO: add icon links

  return (
    <div className="mb-12 ml-12 mr-12 flex justify-between">
      <div className="flex items-center justify-center">
        <MdCopyright />
        <p className="text-xs">2024 TAG HUNTER</p>
      </div>
      <div className="flex">
        <FaFacebook size={32} />
        <FaDiscord size={32} />
        <FaInstagram size={32} />
        <FaTwitter size={32} />
      </div>
    </div>
  )
}
