# Bom dia Imagens especificações:


# RF:

- [x] Deve ser possível que o usuário se cadastre
- [x] O usuário deve poder se autenticar
- [x] Deve ser possível obter o perfil de um usuário logado
- [ ] O usuário deve poder enviar uma imagem
- [ ] O usuário deve poder ver todas as fotos que enviou
- [ ] Deve ser possível que o usuário apague uma foto que enviou
- [ ] Deve ser possível buscar uma imagem
- [ ] Usuários não cadastrados devem conseguir ver imagens

# RN:

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado
- [ ] O usuário não deve poder enviar aquivos que não sejam fotos
- [ ] O usuário não pode enviar mais que uma foto a cada 5 minutos


# RNF:

- [ ] A senha do usuário deve ser criptografada
- [ ] Os dados da aplicação precisam estar persistidos em um SGBD Postgres
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página
- [x] O usuário deve ser identificado por um JWT (JSON Web Token)