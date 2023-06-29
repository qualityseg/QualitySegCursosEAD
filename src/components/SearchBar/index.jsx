import React, { useEffect, useState } from 'react'; 
import { Badge, Button, Container, Table } from 'react-bootstrap';
import cursosData from './cursos.json';
import styles from './CursosEad.module.scss';
import axios from 'axios';
<<<<<<< HEAD
import ReactModal from 'react-modal'; // importando o ReactModal
=======
import Modal from 'react-modal';
>>>>>>> 5ea458a8843c96a0035ce76287521ad579f5bbe7



const Catalogo = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(cursosData);
  const [modalShow, setModalShow] = useState(true);
  const [email, setEmail] = useState("");

  const [selectedCourses, setSelectedCourses] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [paymentData, setPaymentData] = useState({
    title: '',
    price: '',
    quantity: 1,
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && document.getElementById('root')) {
        ReactModal.setAppElement('#root');
    }
}, []);



  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setPaymentData(prevData => ({ ...prevData, email: event.target.value }));
  };
  

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    if (searchTerm) {
      const filteredResults = cursosData.filter((curso) =>
        curso.titulo.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults(cursosData);
    }
  };

  const handleCourseSelection = (e, curso) => {
    const isSelected = selectedCourses.some((c) => c.id === curso.id);

    if (isSelected) {
      setSelectedCourses((prevSelectedCourses) =>
        prevSelectedCourses.filter((c) => c.id !== curso.id)
      );
    } else {
      setSelectedCourses((prevSelectedCourses) => [
        ...prevSelectedCourses,
        {
          id: curso.id,
          quantidade: 1,
          titulo: curso.titulo,
          valor: curso.valor,
        },
      ]);
    }

    e.currentTarget.parentNode.classList.toggle(styles.selected);
    const floatingButton = document.querySelector('.floatingButton');
    if (floatingButton) {
      floatingButton.classList.toggle(styles.selected, selectedCourses.length > 0);
    }
  };

  const handleQuantityChange = (e, curso) => {
    const quantity = parseInt(e.target.value);
    setSelectedCourses((prevSelectedCourses) =>
      prevSelectedCourses.map((c) =>
        c.id === curso.id ? { ...c, quantidade: quantity } : c
      )
    );
  };

  const handleSubmit = async () => {
    try {
<<<<<<< HEAD
      // Mapeie cada curso selecionado para um item
      const items = selectedCourses.map((curso) => ({
        title: curso.titulo,
        unit_price: parseFloat(curso.valor),
        quantity: curso.quantidade,
      }));
  
      // Passe o array de itens para o servidor
      const response = await axios.post('https://wild-cyan-elephant-suit.cyclic.app/create_preference', { items });
  
      const data = response.data;
      window.open(`https://www.mercadopago.com.br/checkout/v1/redirect?preference-id=${data.id}`);
=======
      const response = await axios.post('https://wild-cyan-elephant-suit.cyclic.app/create_preference', paymentData);
  
      const data = response.data;
      window.open(`https://www.mercadopago.com.br/checkout/v1/redirect?preference-id=${data.id}`, '_blank');
>>>>>>> 5ea458a8843c96a0035ce76287521ad579f5bbe7
    } catch (error) {
      console.error(error);
    }
  };
  
<<<<<<< HEAD
  
  

=======
>>>>>>> 5ea458a8843c96a0035ce76287521ad579f5bbe7
  const handleCheckout = async () => {
    const items = selectedCourses.map((curso) => ({
      title: curso.titulo,
      unit_price: parseFloat(curso.valor),
      quantity: curso.quantidade,
    }));
  
<<<<<<< HEAD
    setPaymentData(items);  // Agora paymentData é um array de itens
=======
    setPaymentData(prevData => ({
      ...prevData,
      title: 'Cursos selecionados',
      price: items.reduce((total, item) => total + item.unit_price * item.quantity, 0),
      quantity: items.length,
      email: email, // adicione esta linha
      payer: {
        email // e aqui
      },
      additional_info: JSON.stringify({ courses: selectedCourses, email }), // Armazene os detalhes dos cursos selecionados e o e-mail do usuário aqui
    }));
  };
  
  
  
  const handleConfirm = () => {
    if (validateEmail(email)) {
      setModalShow(false);
    } else {
      alert('Por favor, insira um e-mail válido.');
    }
  };
  
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
>>>>>>> 5ea458a8843c96a0035ce76287521ad579f5bbe7
  };
  

  return (
    <Container>
      Modal.setAppElement('#root');
      <Modal
        isOpen={modalShow}
        onRequestClose={() => setModalShow(false)}
        shouldCloseOnOverlayClick={false} // Adicione esta linha
        contentLabel="Email Modal"
        style={{
          content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            width: '475px',
            height: '130px',
            fontSize: '12px',
            backgroundColor: '#01A982',
            boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          },
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.5)',
          }
        }}
      >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{ marginBottom: '10px' }}>Informe seu e-mail para acessar os Cursos EAD:</h2>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input type="email" value={email} onChange={handleEmailChange} style={{ width: '310px', height: '30px', marginRight: '10px' }} />
            <Button variant="secondary" onClick={handleConfirm} style={{ width: '100px', height: '30px' }}>
              Confirmar
            </Button>
          </div>
        </div>
      </Modal>


      <div className={styles.searchContainer}>
        <div className={styles['search-bar']}>
          <input
            type="text"
            placeholder="Pesquisar"
            value={searchTerm}
            onChange={handleSearch}
          />
          <div className={styles['search-icon']}></div>
        </div>
      </div>
      <div className={`${styles.treatments} ${styles.center}`}>
        {searchResults.map((curso) => {
          const isSelected = selectedCourses.some((c) => c.id === curso.id);
          const selectedCourse = selectedCourses.find((c) => c.id === curso.id);
          return (
            <div
              className={`${styles.treatmentsItem} ${isSelected ? styles.selected : ''}`}
              key={curso.id}
            >
              <div className={styles.images}>
                <img
                  src={curso.imageSrc}
                  alt={curso.titulo}
                  className={styles.image}
                  width={235}
                  height={127}
                />
              </div>
              <h3>{curso.titulo}</h3>
              <div className={styles.description}>
                <p>{curso.descricao}</p>
              </div>
              <div className={styles.courseInfo}>
                <div className={styles.courseInfoItem}>
                  <p className={styles.courseInfoText}>
                    Carga Horaria: {curso.carga_horaria}
                  </p>
                </div>
                <div className={styles.courseInfoItem}>
                  <p className={styles.courseInfoText}>Valor: {curso.valor}</p>
                </div>
              </div>
              <Button
                className={`${styles.courseButton} ${
                  isSelected ? `${styles.danger} ${styles.selectedButton}` : styles.primary
                }`}
                style={{ backgroundColor: '#01A982' }}
                onClick={(e) => handleCourseSelection(e, curso)}
              >
                {isSelected ? 'Remover curso' : <span className="select-course-text">Selecione o curso</span>}
              </Button>

              {isSelected && (
                <div className={styles.quantityOption}>
                  <label htmlFor={`quantity-${curso.id}`}>Quantidade:</label>
                  <select
                    id={`quantity-${curso.id}`}
                    value={selectedCourse.quantidade}
                    onChange={(e) => handleQuantityChange(e, curso)}
                  >
                    {Array.from({ length: 50 }, (_, index) => (
                      <option value={index + 1} key={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          );
        })}

      </div>
      
      <ReactModal isOpen={isOpen} onRequestClose={handleModalClose}>
        <h2>Carrinho</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Curso</th>
              <th>Valor</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {selectedCourses.map(curso => (
              <tr key={curso.id}>
                <td>{curso.titulo}</td>
                <td>{curso.valor}</td>
                <td>{curso.quantidade}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td colSpan="2">{selectedCourses.reduce((total, curso) => total + curso.valor * curso.quantidade, 0)}</td>
            </tr>
          </tfoot>
        </Table>
        <button onClick={handleModalClose}>Fechar</button>
      </ReactModal>
      <Button className={`${styles.floatingButton} floatingButton`} onClick={handleSubmit}>
        <img src="https://i.imgur.com/NTdUTN0.png" alt="Icon" />
        <Badge pill variant="danger" className={`${styles.customBadge} Badge`}>
          {selectedCourses.reduce((total, curso) => total + curso.quantidade, 0)}
        </Badge>
      </Button>


    

    </Container>
  );
};

export default Catalogo;
