/* eslint-disable jsx-a11y/anchor-is-valid */
import { AxiosError } from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { KTSVG } from '../../../../_metronic/helpers'
import { Card4 } from '../../../../_metronic/partials/content/cards/Card4'
import { getDocuments, uploadDocument } from '../../../api/documents'
import { DocumentType } from '../../../interfaces/document';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react'
import { ErrorMessage, Field } from 'formik';
import { FileCard } from '../../../components/FileCard';

export function Documents() {

  const [documents, setDocuments] = useState<DocumentType[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [error, setError] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const getData = async () => {
    try {
      const response = await getDocuments();
      console.log(response.data);
      setDocuments(response.data);
    } catch (error: AxiosError | any) {
      setError(error.message);
      console.log(error);
    }
  }

  const handleFileUpload = async () => {
    const formData = new FormData();

    if (fileInput.current && fileInput.current?.files) {
      formData.append(
        "file",
        fileInput.current.files[0]
      );
      
      try {
        await uploadDocument(formData);
        getData()
        onClose()
      } catch (error: any) {
        console.log(error.message)
      }
    }

    console.log(fileInput);
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <>
      <div className='d-flex flex-wrap flex-stack mb-6'>
        <h3 className='fw-bolder my-2'>
          My Documents
          <span className='fs-6 text-gray-400 fw-bold ms-1'>{documents.length} resources</span>
        </h3>

        <div className='d-flex my-2'>
          <div className='d-flex align-items-center position-relative me-4'>
            <KTSVG
              path='/media/icons/duotune/general/gen021.svg'
              className='svg-icon-3 position-absolute ms-3'
            />
            <input
              type='text'
              id='kt_filter_search'
              className='form-control form-control-white form-control-sm w-150px ps-9'
              placeholder='Search'
            />
          </div>

          {/* <a href='#' className='btn btn-primary btn-sm'>
            File Manager
          </a> */}
          <Button className='btn btn-primary btn-sm' onClick={onOpen}>
            File Manager
          </Button>
        </div>
      </div>

      {/* <div className='row g-6 g-xl-9 mb-6 mb-xl-9'>
        <div className='col-12 col-sm-12 col-xl'>
          <Card4
            icon='/media/svg/files/folder-document.svg'
            title='Finance'
            description='7 files'
          />
        </div>
        <div className='col-12 col-sm-12 col-xl'>
          <Card4
            icon='/media/svg/files/folder-document.svg'
            title='Customers'
            description='3 files'
          />
        </div>
        <div className='col-12 col-sm-12 col-xl'>
          <Card4
            icon='/media/svg/files/folder-document.svg'
            title='CRM Project'
            description='25 files'
          />
        </div>
      </div> */}

      <div className='row g-6 g-xl-9 mb-6 mb-xl-9'>
        {documents.map((document) => (
          <div className='col-12 col-sm-12 col-xl'>
            <FileCard document={document} />
          </div>
        ))}
        {/* <div className='col-12 col-sm-12 col-xl'>
          <Card4 icon='/media/svg/files/doc.svg' title='CRM App Docs..' description='3 days ago' />
        </div>
        <div className='col-12 col-sm-12 col-xl'>
          <Card4
            icon='/media/svg/files/css.svg'
            title='User CRUD Styles'
            description='4 days ago'
          />
        </div>
        <div className='col-12 col-sm-12 col-xl'>
          <Card4 icon='/media/svg/files/ai.svg' title='Metronic Logo' description='5 days ago' />
        </div>
        <div className='col-12 col-sm-12 col-xl'>
          <Card4 icon='/media/svg/files/sql.svg' title='Orders backup' description='1 week ago' />
        </div>
      </div>

      <div className='row g-6 g-xl-9 mb-6 mb-xl-9'>
        <div className='col-12 col-sm-12 col-xl'>
          <Card4
            icon='/media/svg/files/xml.svg'
            title='UTAIR CRM API Co..'
            description='2 week ago'
          />
        </div>
        <div className='col-12 col-sm-12 col-xl'>
          <Card4
            icon='/media/svg/files/tif.svg'
            title='Tower Hill App..'
            description='3 week ago'
          />
        </div> */}
      </div>


      <Modal isOpen={isOpen} onClose={onClose} size={'4xl'} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload a new document</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className='w-100'>
              <div className='pb-10 pb-lg-15'>
                <h2 className='fw-bolder d-flex align-items-center text-dark'>
                  Attach the file
                  <i
                    className='fas fa-exclamation-circle ms-2 fs-7'
                    data-bs-toggle='tooltip'
                    title='You can attach up to a CSV file here'
                  ></i>
                </h2>

                <div className='text-gray-400 fw-bold fs-6'>
                  If you need more info, please check out
                  <a href='/dashboard' className='link-primary fw-bolder'>
                    {' '}
                    Help Page
                  </a>
                  .
                </div>
              </div>

              <div className='fv-row'>
                <div className='row justify-content-center'>
                  <div className='col-6'>
                    <input type="file" ref={fileInput} style={{display: 'none'}} />
                    <label
                      className='btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center mb-10'
                      htmlFor='kt_create_account_form_account_type_personal'
                      onClick={() => {fileInput.current?.click()}}
                    >
                      <KTSVG
                        path='/media/icons/duotune/communication/com005.svg'
                        className='svg-icon-3x me-5'
                      />

                      <span className='d-block fw-bold text-start'>
                        <span className='text-dark fw-bolder d-block fs-4 mb-2'>{fileInput.current?.files ? fileInput.current.files[0]?.name : "CSV Upload"}</span>
                        <span className='text-gray-400 fw-bold fs-6'>
                          If you need more info, please check it out
                        </span>
                      </span>
                    </label>
                  </div>

                  <div className='text-danger mt-2'>
                    {/* <ErrorMessage name='accountType' /> */}
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button className='btn btn-primary btn-sm' mr={3} onClick={() => handleFileUpload()}>
              Upload
            </Button>
            <Button className='btn btn-primary btn-sm' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
