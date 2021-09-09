import axios from '@/utils/requestAdmin'
import qs from 'qs'
const sentence = {
  QuerySentenceByPage(page) {
    return axios.post(
      '/sentence/pages',
      qs.stringify({
        page,
      })
    )
  },
  AddNewSentence(form) {
    return axios.post('/sentence/add', form)
  },
  QuerySentenceById(Id) {
    return axios.post(
      '/sentence/messId',
      qs.stringify({
        Id,
      })
    )
  },
  DeleteById(id) {
    return axios.post(
      '/sentence/delete',
      qs.stringify({
        id,
      })
    )
  },
  UpdateById(form) {
    return axios.post('/sentence/update', form)
  },
}

export default sentence
