import { NotFoundPage } from '../../page-objects/not-found.page';
// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />

const notFoundPage = new NotFoundPage();

context('Componente Página não encontrada', () => {
  beforeEach(() => {
    cy.visit(notFoundPage.url);
  });

  describe('Testes', () => {
    it('Redirecionar para a tela de Página não encontrada.', () => {
      notFoundPage
        .titleNotFound()
        .should('have.text', notFoundPage.textNotFound);
    });
  });
});
