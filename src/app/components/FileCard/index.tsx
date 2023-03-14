/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import { toAbsoluteUrl } from '../../../_metronic/helpers'
import { DocumentType } from '../../interfaces/document'

type Props = {
  document: DocumentType
}

const FileCard: FC<Props> = ({ document }) => {
  return (
    <div className='card h-100'>
      <div className='card-body d-flex justify-content-center text-center flex-column p-8'>
        <a href={document.file} target="_blank" className='text-gray-800 text-hover-primary d-flex flex-column'>
          <div className='symbol symbol-75px mb-6'>
            <img src={toAbsoluteUrl('/media/svg/files/pdf.svg')} alt='' />
          </div>
          <div className='fs-5 fw-bolder mb-2'>CSV #{document.id}</div>
        </a>
        {/* <div className='fs-7 fw-bold text-gray-400 mt-auto'>{description}</div> */}
      </div>
    </div>
  )
}

export {FileCard}
