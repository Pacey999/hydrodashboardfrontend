import axios from "axios"
import { DocumentType } from "../../interfaces/document"
import { URL } from "../index"

export const getDocuments = async () => {
    return axios.get<DocumentType[]>(URL + "data_import/document/")
}

export const uploadDocument = async (formData: FormData) => {
    console.log(formData)
    return axios.post<DocumentType>(URL + "data_import/document/", formData)
}