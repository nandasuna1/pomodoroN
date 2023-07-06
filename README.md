# - TimerN -

## Introdução
Este projeto foi desenvolvido utilizando alguns conceitos-chave do React, incluindo Context API e useReducer. Neste README, vamos explicar brevemente cada um desses conceitos e como eles foram aplicados na construção deste aplicativo.

## Context API
A Context API é uma funcionalidade do React que permite compartilhar dados entre componentes sem a necessidade de passar propriedades manualmente de pai para filho. Ele fornece uma forma eficiente de gerenciar o estado global da aplicação e disponibilizá-lo para qualquer componente que precise acessá-lo.

Neste projeto, utilizamos a Context API para criar um contexto personalizado para o tema da aplicação. Com isso, podemos facilmente alternar entre temas claros e escuros em toda a aplicação, mantendo um estado global e fornecendo esse estado para os componentes relevantes.

## useReducer
O useReducer é um hook do React que nos permite gerenciar um estado complexo utilizando o conceito de reducers, semelhante ao Redux. Ele é especialmente útil quando temos um estado com lógica mais complexa ou quando precisamos lidar com várias ações que modificam esse estado.

No projeto, utilizamos o useReducer para gerenciar o estado do timer e do histórico de atividades. Ele nos permite definir as ações disponíveis (iniciar, pausar, reiniciar, salvar) e como o estado deve ser atualizado em resposta a essas ações. O useReducer nos ajuda a manter um código mais organizado e legível, separando a lógica de estado em um reducer central.

## React Router
O React Router é uma biblioteca que nos permite adicionar roteamento ao nosso aplicativo React, facilitando a navegação entre diferentes páginas. Ele nos permite definir rotas e associá-las a componentes específicos, criando uma experiência de navegação fluida.

Neste projeto, utilizamos o React Router para criar rotas para a página do timer e a página de histórico de atividades. Com isso, podemos alternar entre essas páginas com facilidade, mantendo uma experiência de usuário agradável.

## Outros Conceitos
Além dos conceitos mencionados acima, também utilizamos outros recursos e conceitos importantes no projeto, incluindo:

- Componentes Funcionais: Todos os componentes foram criados como funções, aproveitando o poder dos hooks do React.
- Styled Components: Utilizamos a biblioteca Styled Components para estilizar nossos componentes, facilitando a criação de estilos reutilizáveis e com escopo.
- Props: Utilizamos props para passar dados e funcionalidades entre os componentes, seguindo os princípios de composição e reutilização.
- Hooks: Além do useReducer, também utilizamos outros hooks fornecidos pelo React, como useState e useContext, para gerenciar o estado local de componentes e acessar o contexto.

## Conclusão
Este projeto utilizou conceitos avançados do React, como Context API e useReducer, para criar um aplicativo de timer com histórico de atividades. Esses conceitos nos permitem criar aplicações mais escaláveis, organizadas e com um melhor gerenciamento de estado.

Se você quiser aprender mais sobre esses conceitos ou explorar o código-fonte do projeto, sinta-se à vontade para verificar o código disponível neste repositório.