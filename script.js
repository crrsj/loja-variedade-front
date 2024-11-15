function cadastrarRegistro(categoria,nome,marca,modelo,imagem,preco) {
    
    // Captura os valores do formulário
    var  categoria = document.getElementById("categoria").value;
    var  nome = document.getElementById("nome").value;
    var  marca = document.getElementById("marca").value;
    var  modelo = document.getElementById("modelo").value;
    var  imagem = document.getElementById("imagem").value;
    var  preco = document.getElementById("preco").value;
    
    
    // Cria um objeto com os dados a serem enviados
    var data = {
        categoria: categoria,
        nome: nome,
        marca: marca,
        modelo: modelo,
        imagem: imagem,
        preco: preco
            
    };

    // Envia os dados para o servidor
    fetch('http://localhost:8080/produtos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao cadastrar registro.');
            
        }
        return response.json();
    })
    .then(data => {
        console.log( 'Registro cadastrado com sucesso:', data);
        alert("Cadastro realizado com sucesso !")
        fetchDataAndPopulateTable();
    })
    .catch(error => {
        console.error('Erro:', error);
    });
     document.getElementById("categoria").value ="";
     document.getElementById("nome").value ="";
     document.getElementById("marca").value ="";
     document.getElementById("modelo").value ="";
     document.getElementById("imagem").value ="";
     document.getElementById("preco").value ="";
         
    // window.location.href = "";
   
}
function validarFormulario() { 
    var categoria = document.getElementById('categoria').value;
    var nome = document.getElementById('nome').value;
    var marca = document.getElementById('marca').value;
    var modelo = document.getElementById('modelo').value;
    var imagem = document.getElementById('imagem').value;
    var preco = document.getElementById('preco').value;


     if (categoria === '') {
        alert('Por favor, preencha o campo Nome.');
        return false;
    }
   
    if (nome === '') {
        alert('Por favor, preencha o campo Nome.');
        return false;
    }
    if (marca === '') {
        alert('Por favor, preencha o campo Nome.');
        return false;
    }

    if (modelo === '') {
        alert('Por favor, preencha o campo Nome.');
        return false;
    }

    if (imagem === '') {
        alert('Por favor, preencha o campo imagem.');
        return false;
    }
    if (preco === '') {
        alert('Por favor, preencha o campo valor.');
        return false;
    }
   
    
    // Se a validação passar, você pode chamar a função para salvar os registros
     cadastrarRegistro(categoria,nome,marca,modelo,imagem,preco);

    // Retorna true para permitir o envio do formulário após salvar os registros
    return true;
}

async function fetchDataAndPopulateTable() {
    try {
      // Substitua 'URL_DA_SUA_API' pela URL real da sua API
      const response = await fetch('http://localhost:8080/produtos');
      const data = await response.json();

      // Limpa a tabela antes de inserir novos dados
      const tbody = document.querySelector('#tabela tbody');
      tbody.innerHTML = '';

      // Preenche a tabela com os dados recebidos da API
      data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.id}</td>
          <td>${item.categoria}</td>
          <td>${item.nome}</td>
          <td>${item.marca}</td>
          <td>${item.modelo}</td>
          <td><img src="${item.imagem}" alt="${item.nome}" style="max-width: 100px; max-height: 100px;"></td>
          <td>${item.preco}</td>                 
          <td><button  class="btn btn-success"  onclick="buscarDados(${item.id})">Editar</button></td>          
          <td><button  class="btn btn-danger" onclick="deletarRegistro(${item.id})">Excluir</button></td>`;
                       
        tbody.appendChild(row);
      });
    } catch (error) {
      console.error('Erro ao buscar e preencher dados:', error);
    }
  }
  document.addEventListener('DOMContentLoaded', () => {
  // Chama a função para buscar e preencher os dados quando a página carrega
   fetchDataAndPopulateTable();
});

async function updateUserData() {    
    const idInput =  document.getElementById("id");
    const categoriaInput = document.getElementById("categoria");
    const nomeInput = document.getElementById("nome"); 
    const marcaInput = document.getElementById("marca");
    const modeloInput = document.getElementById("modelo");
    const imagemInput = document.getElementById("imagem");
    const precoInput = document.getElementById("preco");     
    
      
    const updateId =  idInput.value
    const updateCategoria =  categoriaInput.value
    const updateNome = nomeInput.value  
    const updateMarca =  marcaInput.value
    const updateModelo =  modeloInput.value
    const updateImagem = imagemInput.value
    const updatePreco = precoInput.value 
   
   
  
    try {
      const response =  await fetch(`http://localhost:8080/produtos`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: updateId,
          categoria: updateCategoria,          
          nome: updateNome, 
          marca: updateMarca,
          modelo: updateModelo,
          imagem: updateImagem,        
          preco: updatePreco,        
          
                    
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
      }
  
      alert('Dados do usuário atualizados com sucesso!');
      fetchDataAndPopulateTable();          
    } catch (error) {
      console.error(`Erro durante a atualização dos dados: ${error.message}`);
    }
    ocument.getElementById("id").value = "";   
    ocument.getElementById("categoria").value = "";   
    document.getElementById("nome").value = "";   
    document.getElementById("marca").value ="";
    document.getElementById("modelo").value ="";
    ocument.getElementById("imagem").value = "";   
    ocument.getElementById("preco").value = "";   
    
  }




  async function deletarRegistro(id) {
    try {
      // Substitua 'URL_DA_SUA_API' pela URL real da sua API para deletar
      const response = await fetch(`http://localhost:8080/produtos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Adicione cabeçalhos adicionais, se necessário
        },
      });
        //alert("Tem certeza que deseja deletar esta resercva?");
      if (response.ok) {
        console.log(`Registro com ID ${id} deletado com sucesso.`);
        // Atualiza a tabela após a exclusão
        fetchDataAndPopulateTable();
      } else {
        console.error('Erro ao deletar registro:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao deletar registro:', error);
    }
  }


  async function buscarDados(id) {
    try { 
        // URL da API, substitua pela sua URL
        const response = await fetch(`http://localhost:8080/produtos/${id}`);

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao buscar dados');
        }

        // Converte a resposta em JSON
        const data = await response.json();
        openModal();
      

document.getElementById('id').value = data.id;
document.getElementById('categoria').value = data.categoria;
document.getElementById('nome').value = data.nome;
document.getElementById('marca').value = data.marca;  
document.getElementById('modelo').value = data.modelo;
document.getElementById('imagem').value = data.imagem;
document.getElementById('preco').value = data.preco; 




} catch (error) {
console.error('Erro:', error);
}

}
    

function openModal() {

// Seleciona o modal pelo ID
var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));

// Abre o modal
myModal.show();


}

   

 