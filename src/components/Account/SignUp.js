import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signUp } from '../../services/API';
import {
  ContainerAccount,
  Title,
  Form,
  Input,
  Button,
  ChangePage,
  Error
} from './ContainerAccount';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    localStorage.removeItem('user');
    const body = {
      name,
      email,
      password,
      confirmPassword
    };
    if (password !== confirmPassword) {
      setErrorMessage('Senhas diferentes');
      return;
    }
    signUp(body)
      .then(() => {
        navigate('/sign-in');
      })
      .catch((err) => {
        if (err.response.status === 409) {
          setErrorMessage('Email já cadastrado');
        } else {
          setErrorMessage('Dados Inválidos');
        }
      });
  }

  return (
    <ContainerAccount>
      <Title>Bem vindo ao Gratibox</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirmar senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Error>{errorMessage}</Error>
        <Button type="submit">Cadastrar</Button>
      </Form>
      <Link to="/sign-in">
        <ChangePage>Já sou grato</ChangePage>
      </Link>
    </ContainerAccount>
  );
}
