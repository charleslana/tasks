import { DialogComponent } from '../../page-objects/dialog.component';
import { LoadingComponent } from '../../page-objects/loading.component';
import { Random } from '../../page-objects/random';
import { TaskPage } from '../../page-objects/task.page';
import { ToastComponent } from '../../page-objects/toast.component';
// eslint-disable-next-line spaced-comment
/// <reference types="cypress" />

const task = new TaskPage();
const loadingComponent = new LoadingComponent();
const toastComponent = new ToastComponent();
const dialogComponent = new DialogComponent();
let text: string;
const fixedText = 'Um texto';

context('Módulo Tarefas', () => {
  beforeEach(() => {
    cy.visit('/');
    text = Random.generateText();
  });

  describe('Testes', () => {
    // it('Verificar o carregamento das tarefas.', () => {
    //   loadingComponent.loading();
    // });

    // it('Criar a tarefa', () => {
    //   loadingComponent.loading();
    //   task.create(text);
    // });

    // it('Remover todas as tarefas, na confirmação acionar o botão Não.', () => {
    //   loadingComponent.loading();
    //   task.create(text);
    //   task.btnRemoveAll().should('be.visible');
    //   task.btnRemoveAll().click();
    //   dialogComponent.isVisible().should('be.visible');
    //   dialogComponent.btnNo().click();
    //   dialogComponent.isVisible().should('not.exist');
    // });

    // it('Remover todas as tarefas, na confirmação acionar o botão Sim.', () => {
    //   task.removeAllTasks(text);
    // });

    // it('Editar a tarefa e confirmar a Atualização.', () => {
    //   task.removeAllTasks(text);
    //   task.create(text);
    //   task.btnEdit().click();
    //   dialogComponent.isVisible().should('be.visible');
    //   dialogComponent.inputEditDescription().clear().type(`${text} atualizado`);
    //   dialogComponent.btnUpdate().click();
    //   dialogComponent.isVisible().should('not.be.visible');
    //   loadingComponent.loading();
    //   toastComponent.toastSuccess();
    // });

    // it('Editar a tarefa e Cancelar.', () => {
    //   loadingComponent.loading();
    //   task.create(text);
    //   task.btnEdit().click();
    //   dialogComponent.isVisible().should('be.visible');
    //   dialogComponent.btnCancel().click();
    //   dialogComponent.isVisible().should('not.exist');
    // });

    // it('Editar a tarefa com uma descrição existente.', () => {
    //   task.removeAllTasks(text);
    //   task.create(text);
    //   task.create(fixedText);
    //   task.btnEdit().click();
    //   dialogComponent.isVisible().should('be.visible');
    //   dialogComponent.inputEditDescription().clear().type(fixedText);
    //   dialogComponent.btnUpdate().click();
    //   dialogComponent.alertDialog().should('be.visible');
    // });

    // it('Finalizar a tarefa, na confirmação acionar o botão Sim.', () => {
    //   task.removeAllTasks(text);
    //   task.create(text);
    //   task.btnFinish().click();
    //   dialogComponent.isVisible().should('be.visible');
    //   dialogComponent.btnYes().click();
    //   dialogComponent.isVisible().should('not.be.visible');
    //   loadingComponent.loading();
    //   toastComponent.toastSuccess();
    //   task.tableActions().should('have.length', '1');
    // });

    it('Finalizar a tarefa, na confirmação acionar o botão Não.', () => {
      task.removeAllTasks(text);
      task.create(text);
      task.btnFinish().click();
      dialogComponent.isVisible().should('be.visible');
      dialogComponent.btnNo().click();
      dialogComponent.isVisible().should('not.exist');
    });
  });
});
