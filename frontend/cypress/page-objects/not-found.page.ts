export class NotFoundPage {
  textNotFound = 'Página não encontrada';
  url = '/error';

  titleNotFound() {
    return cy.get('h1').first();
  }
}
