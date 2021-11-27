import { DialogComponent } from './dialog.component';
import { LoadingComponent } from './loading.component';
import { ToastComponent } from './toast.component';
/* eslint-disable spaced-comment */
/// <reference types="cypress" />

const loadingComponent = new LoadingComponent();
const toastComponent = new ToastComponent();
const dialogComponent = new DialogComponent();

export class TaskPage {
  inputDescription() {
    return cy.get('#description');
  }

  btnRegister() {
    return cy.get('.formgroup-inline > .p-button').first();
  }

  btnRemoveAll() {
    return cy.get('#btnRemoveAllTasks');
  }

  create(text: string) {
    this.inputDescription().type(text);
    this.btnRegister().click();
    loadingComponent.loading();
    toastComponent.toastSuccess();
  }

  btnEdit() {
    return cy.get('.p-button-info').first();
  }

  removeAllTasks(text: string) {
    loadingComponent.loading();
    this.create(text);
    this.btnRemoveAll().should('be.visible');
    this.btnRemoveAll().click();
    dialogComponent.isVisible().should('be.visible');
    dialogComponent.btnYes().click();
    dialogComponent.isVisible().should('not.be.visible');
    loadingComponent.loading();
    toastComponent.toastSuccess();
    this.btnRemoveAll().should('not.exist');
  }

  btnFinish() {
    return cy.get(':nth-child(5) > .p-button-success').first();
  }

  tableActions() {
    return cy.get(':nth-child(5)').first();
  }
}
