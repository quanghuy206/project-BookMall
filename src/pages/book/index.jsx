import { useLocation } from "react-router-dom"
import ViewDetail from "../../components/Book/ViewDetail"
import { callGetDetailBook } from '../../services/api';
import { useEffect, useState } from "react";


const BookPage = () => {
  //get id form ParamUrl
  const [dataBook, setDataBook] = useState()
  let location = useLocation()
  let params = new URLSearchParams(location.search)
  const id = params?.get("id")

  useEffect(() => {
    getDetail(id)
  }, [id])

  const getDetail = async (id) => {
    const res = await callGetDetailBook(id)
    if (res && res.data) {
      let raw = res.data;
      raw.items = getImage(raw)
      setTimeout(() => {
        setDataBook(raw)
      }, );
    }
  }

  const getImage = (raw) => {
    const images = []
    if (raw.thumbnail) {
      images.push({
        original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${raw.thumbnail}`,
        thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${raw.thumbnail}`,
        originalClass: "original-image",
        thumbnailClass: "thumbnail-image"
      })
    }
    if (raw.slider) {
      raw.slider?.map(item => {
        images.push({
          original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
          thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
          originalClass: "original-image",
          thumbnailClass: "thumbnail-image"
        })
      })
    }
    return images
  }
  return (
    <>
      <ViewDetail dataBook={dataBook} />
    </>
  )
}

export default BookPage