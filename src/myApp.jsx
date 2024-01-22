// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

// Komponen untuk menampilkan data dari API
const DataDisplay = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Mengambil data dari API menggunakan Axios
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Data dari API:</h2>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

// Komponen untuk menangani formulir
const FormComponent = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lakukan sesuatu dengan data formulir
    console.log('Data formulir:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Formulir</h2>
      <label>
        Username:
        <input type="text" name="username" value={formData.username} onChange={handleInputChange} />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
      </label>
      <button type="submit">Kirim</button>
    </form>
  );
};

// Komponen untuk halaman beranda
const Home = () => (
  <div>
    <h1>Selamat Datang di Aplikasi React</h1>
    <p>Ini adalah halaman beranda.</p>
  </div>
);

// Komponen untuk halaman tentang
const About = () => (
  <div>
    <h1>Tentang Kami</h1>
    <p>Ini adalah halaman tentang kami.</p>
  </div>
);

// Styled-components untuk styling
const StyledLink = styled(Link)`
  margin-right: 20px;
  color: #333;
  text-decoration: none;
`;

const Navigation = styled.nav`
  background-color: #eee;
  padding: 10px;
`;

const MyApp = () => {
  return (
    <Router>
      <div>
        <Navigation>
          <StyledLink to="/">Beranda</StyledLink>
          <StyledLink to="/about">Tentang</StyledLink>
          <StyledLink to="/data">Data</StyledLink>
          <StyledLink to="/form">Formulir</StyledLink>
        </Navigation>

        <hr />

        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/data" component={DataDisplay} />
        <Route path="/form" component={FormComponent} />
      </div>
    </Router>
  );
};

export default MyApp;
