import { AboutPage } from '../../page-objects/about.page';
// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />

const aboutPage = new AboutPage();

context('Módulo Sobre', () => {
  beforeEach(() => {
    cy.visit(aboutPage.url);
  });

  describe('Testes', () => {
    it('Validar url de Sobre.', () => {
      cy.url().should('contain', aboutPage.url);
    });
  });
});
