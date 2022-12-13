import { useEffect, useState } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input
} from 'reactstrap'
library.add(faBars)

const Movie = () => {
  const [title, setTitle] = useState('')
  const [synopsis, setSynopsis] = useState('')
  const [time, setTime] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modal, setModal] = useState(false)
  const [modalEdit, setModalEdit] = useState(false)
  const toggle = () => setModal(!modal)
  const toggleEdit = (data) => {
    setTitle(data.title)
    setTime(data.time)
    setSynopsis(data.synopsis)
    setModalEdit(!modalEdit)
  }
  const handleSubmit = (event) => {
    event.preventDefault() // 👈️ prevent page refresh

    // 👇️ access input values here
    console.log('time 👉️', time)
    console.log('synopsis 👉️', synopsis)
    console.log('title 👉️', title)
    if (time === '' || synopsis === '' || title === '') {
      alert("veuillez renseigner un titre, un temps ainsi qu'un synopsis")
    } else {
      fetch('http://localhost:3000/movie/add', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          time: time,
          synopsis: synopsis,
          title: title
        })
      })
        .then((res) => res.json())
        .then(
          (result) => {
            setLoading(true)
            console.log(result)
          },
          (error) => {
            setLoading(true)
            setError(error)
          }
        )
      // 👇️ clear all input values in the form

      setSynopsis('')
      setTitle('')
      setTime('')
      toggle()
      window.location.reload()
    }
  }
  const secondsToHms = (d) => {
    d = Number(d)
    let h = Math.floor(d / 3600)
    let m = Math.floor((d % 3600) / 60)
    let s = Math.floor((d % 3600) % 60)

    let hDisplay = h + ':'
    if (h < 1) {
      hDisplay = ''
    }
    let mDisplay = m + ':'
    if (m < 10) {
      mDisplay = '0' + m + ':'
    }
    let sDisplay = s + ''
    if (s < 10) {
      sDisplay = '0' + s + ''
    }
    return hDisplay + mDisplay + sDisplay
  }

  useEffect(() => {
    fetch(`http://localhost:3000/movie`)
      .then((res) => res.json())
      .then(
        (result) => {
          setLoading(true)
          setData(result.data)
        },
        (error) => {
          setLoading(true)
          setError(error)
        }
      )
  }, [])

  return (
    <div className="movie">
      <Button onClick={toggle}>Ajouter un Film</Button>
      <div className="movie-list">
        {data?.map((data) => (
          <Card
            key={data.id}
            style={{
              width: '18rem',
              margin: '20px',
              minWidth: '250px'
            }}
          >
            <CardBody>
              <CardTitle tag="h5">{data.title} </CardTitle>
              <FontAwesomeIcon
                onClick={() => toggleEdit(data)}
                icon="fa-solid fa-bars"
              />
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                {secondsToHms(data.time)}
              </CardSubtitle>
              <CardText>{data.synopsis}</CardText>
            </CardBody>
          </Card>
        ))}
      </div>
      {/* modal add movie */}
      <Modal isOpen={modal} toggle={toggle} centered={true}>
        <ModalHeader toggle={toggle}>Ajouter votre film</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="title">Titre</Label>
            <Input
              id="title"
              name="title"
              placeholder="le titre de votre film"
              type="text"
              onChange={(event) => setTitle(event.target.value)}
              value={title}
            />
          </FormGroup>
          <FormGroup>
            <Label for="time">Temps</Label>
            <Input
              id="time"
              name="time"
              placeholder="le temps du film en seconde"
              type="text"
              onChange={(event) => setTime(event.target.value)}
              value={time}
            />
          </FormGroup>
          <FormGroup>
            <Label for="synopsis">Synopsis</Label>
            <Input
              id="synopsis"
              name="synopsis"
              placeholder="le synopsis du film"
              type="textarea"
              style={{ height: '200px' }}
              onChange={(event) => setSynopsis(event.target.value)}
              value={synopsis}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Enregistrer le film
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Annuler
          </Button>
        </ModalFooter>
      </Modal>
      {/* modal edit movie */}
      <Modal isOpen={modalEdit} toggle={toggleEdit} centered={true}>
        <ModalHeader toggle={toggleEdit}>Editer le film</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="title">Titre</Label>
            <Input
              id="title"
              name="title"
              placeholder="le titre de votre film"
              type="text"
              onChange={(event) => setTitle(event.target.value)}
              value={title}
            />
          </FormGroup>
          <FormGroup>
            <Label for="time">Temps</Label>
            <Input
              id="time"
              name="time"
              placeholder="le temps du film en seconde"
              type="text"
              onChange={(event) => setTime(event.target.value)}
              value={time}
            />
          </FormGroup>
          <FormGroup>
            <Label for="synopsis">Synopsis</Label>
            <Input
              id="synopsis"
              name="synopsis"
              placeholder="le synopsis du film"
              type="textarea"
              style={{ height: '200px' }}
              onChange={(event) => setSynopsis(event.target.value)}
              value={synopsis}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Enregistrer le film
          </Button>{' '}
          <Button color="secondary" onClick={toggleEdit}>
            Annuler
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default Movie
