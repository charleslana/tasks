/* eslint-disable spaced-comment */
/// <reference types="cypress" />

export class DialogComponent {
  alertError = 'Alerta';

  isVisible() {
    return cy.get('.p-dialog-mask').first();
  }

  btnYes() {
    return cy.get('.p-confirm-dialog-accept').first();
  }

  btnNo() {
    return cy.get('.p-confirm-dialog-reject').first();
  }

  btnUpdate() {
    return cy.get('.fluid > .p-button').first();
  }

  btnCancel() {
    return cy.get('.p-dialog-footer > .p-button').first();
  }

  inputEditDescription() {
    return cy.get('#editDescription');
  }

  alertDialog() {
    return cy.get('#pr_id_7_header');
  }
}
