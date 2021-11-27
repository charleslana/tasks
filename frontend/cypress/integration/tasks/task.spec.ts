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
    cy.visit(task.urlTask);
    text = Random.generateText();
  });

  describe('Testes', () => {
    it('Verificar se o texto randômico é o esperado para a descrição da tarefa.', () => {
      expect(text).to.equal(text);
    });

    it('Verificar o carregamento das tarefas.', () => {
      loadingComponent.loading();
    });

    it('Criar a tarefa, campo descrição obrigatório.', () => {
      loadingComponent.loading();
      task.inputDescription().type(' ');
      task.btnRegister().click();
      task.createRequiredField().should('be.visible');
    });

    it('Criar a tarefa com sucesso', () => {
      loadingComponent.loading();
      task.create(text);
    });

    it('Criar a tarefa com uma descrição existente.', () => {
      task.removeAllTasks();
      task.create(text);
      task.create(text, false);
      dialogComponent.alertDialog().should('be.visible');
    });

    it('Remover todas as tarefas, na confirmação acionar o botão Não.', () => {
      loadingComponent.loading();
      task.create(text);
      task.btnRemoveAll().should('be.visible');
      task.btnRemoveAll().click();
      dialogComponent.isVisible().should('be.visible');
      dialogComponent.btnNo().click();
      dialogComponent.isVisible().should('not.exist');
    });

    it('Remover todas as tarefas, na confirmação acionar o botão Sim.', () => {
      task.removeAllTasks();
    });

    it('Editar a tarefa, campo descrição deve vir preenchido.', () => {
      task.removeAllTasks();
      task.create(text);
      task.btnEdit().click();
      dialogComponent.isVisible().should('be.visible');
      dialogComponent.inputEditDescription().should('have.value', text);
    });

    it('Editar a tarefa, campo descrição obrigatório.', () => {
      task.removeAllTasks();
      task.create(text);
      task.btnEdit().click();
      dialogComponent.isVisible().should('be.visible');
      dialogComponent.inputEditDescription().clear().type(' ');
      dialogComponent.btnUpdate().click();
      task.updateRequiredField().should('be.visible');
    });

    it('Editar a tarefa e confirmar com sucesso.', () => {
      task.removeAllTasks();
      task.create(text);
      task.btnEdit().click();
      dialogComponent.isVisible().should('be.visible');
      dialogComponent.inputEditDescription().clear().type(`${text} atualizado`);
      dialogComponent.btnUpdate().click();
      dialogComponent.isVisible().should('not.be.visible');
      loadingComponent.loading();
      toastComponent.toastSuccess();
    });

    it('Editar a tarefa e Cancelar.', () => {
      loadingComponent.loading();
      task.create(text);
      task.btnEdit().click();
      dialogComponent.isVisible().should('be.visible');
      dialogComponent.btnCancel().click();
      dialogComponent.isVisible().should('not.exist');
    });

    it('Editar a tarefa com uma descrição existente.', () => {
      task.removeAllTasks();
      task.create(text);
      task.create(fixedText);
      task.btnEdit().click();
      dialogComponent.isVisible().should('be.visible');
      dialogComponent.inputEditDescription().clear().type(fixedText);
      dialogComponent.btnUpdate().click();
      dialogComponent.alertDialog().should('be.visible');
    });

    it('Finalizar a tarefa, na confirmação acionar o botão Não.', () => {
      task.removeAllTasks();
      task.create(text);
      task.btnFinish().click();
      dialogComponent.isVisible().should('be.visible');
      dialogComponent.btnNo().click();
      dialogComponent.isVisible().should('not.exist');
    });

    it('Finalizar a tarefa, na confirmação acionar o botão Sim.', () => {
      task.removeAllTasks();
      task.create(text);
      task.btnFinish().click();
      dialogComponent.isVisible().should('be.visible');
      dialogComponent.btnYes().click();
      dialogComponent.isVisible().should('not.be.visible');
      loadingComponent.loading();
      toastComponent.toastSuccess();
      task.tableActions().should('have.length', '1');
    });

    it('Excluir a tarefa, na confirmação acionar o botão Não.', () => {
      task.removeAllTasks();
      task.create(text);
      task.btnDelete().click();
      dialogComponent.isVisible().should('be.visible');
      dialogComponent.btnNo().click();
      dialogComponent.isVisible().should('not.exist');
    });

    it('Excluir a tarefa, na confirmação acionar o botão Sim.', () => {
      task.removeAllTasks();
      task.create(text);
      task.btnDelete().click();
      dialogComponent.isVisible().should('be.visible');
      dialogComponent.btnYes().click();
      dialogComponent.isVisible().should('not.be.visible');
      loadingComponent.loading();
      toastComponent.toastSuccess();
      task.taskNotFound();
    });

    it('Selecionar o checkbox da lista de tarefas e desmarcar, o botão selecionar todas deve aparecer quando marcado e desaparecer quando desmarcado.', () => {
      task.removeAllTasks();
      task.create(text);
      task.selectCheckbox().click();
      task.btnFinishSelected().should('be.visible');
      task.selectCheckbox().click();
      task.btnFinishSelected().should('not.exist');
    });

    it('Selecionar todas e desmarcar todas, o botão selecionar todas deve aparecer quando marcado e desaparecer quando desmarcado.', () => {
      task.removeAllTasks();
      task.create(text);
      task.btnSelectAll().click();
      task.btnFinishSelected().should('be.visible');
      task.btnDeselectAll().click();
      task.btnFinishSelected().should('not.exist');
    });

    it('Selecionar todas e finalizar todas, na confirmação acionar o botão Não.', () => {
      task.removeAllTasks();
      task.create(text);
      task.btnSelectAll().click();
      task.btnFinishSelected().should('be.visible');
      task.btnFinishSelected().click();
      dialogComponent.isVisible().should('be.visible');
      dialogComponent.btnNo().click();
      dialogComponent.isVisible().should('not.exist');
    });

    it('Selecionar todas e finalizar todas, na confirmação acionar o botão Sim.', () => {
      task.removeAllTasks();
      task.create(text);
      task.btnSelectAll().click();
      task.btnFinishSelected().should('be.visible');
      task.btnFinishSelected().click();
      dialogComponent.isVisible().should('be.visible');
      dialogComponent.btnYes().click();
      dialogComponent.isVisible().should('not.be.visible');
      loadingComponent.loading();
      toastComponent.toastSuccess();
      task.taskFinished();
    });

    it('Ordernar por tarefa em ordem decrescente.', () => {
      task.removeAllTasks();
      task.create(text);
      task.create(fixedText);
      task.sortByTask().click();
      task.checkFirstText(fixedText);
    });

    it('Filtrar por tarefas ativas.', () => {
      task.removeAllTasks();
      task.create(text);
      task.filterByActive().click();
      task.taskActive();
    });

    it('Filtrar por tarefas finalizadas.', () => {
      task.removeAllTasks();
      task.create(text);
      task.filterByFinished().click();
      task.taskNotFound();
    });

    it('Paginar tarefas', () => {
      task.removeAllTasks();
      task.create('1');
      task.create('2');
      task.create('3');
      task.create('4');
      task.create('5');
      task.create('6');
      task.openSelectPage().click();
      task.choseSelectPage().click();
      task.selectEndPage().click();
      task.checkFirstText('6');
    });

    it('Ver tarefa', () => {
      task.removeAllTasks();
      task.create(text);
      task.linkShowTask().click();
      task.checkUrlTaskDetails();
      loadingComponent.loading();
      task.titleTaskDetails().should('have.text', text);
    });
  });
});
