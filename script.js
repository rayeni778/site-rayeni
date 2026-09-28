document.addEventListener("DOMContentLoaded", () => {

  const form = document.querySelector("#signupForm");

  const loginButtons = document.querySelectorAll(
    ".login, .header-login"
  );

  const genderButtons = document.querySelectorAll(
    ".gender-button"
  );

  const genderInput = document.querySelector("#gender");


  // ==========================
  // BOTÕES DE LOGIN
  // ==========================

  loginButtons.forEach((button) => {

    button.addEventListener("click", () => {
      window.location.href = "login.html";
    });

  });


  // ==========================
  // SELEÇÃO DE GÊNERO
  // ==========================

  genderButtons.forEach((button) => {

    button.addEventListener("click", () => {

      genderButtons.forEach((btn) => {
        btn.classList.remove("selected");
      });

      button.classList.add("selected");

      if (genderInput) {
        genderInput.value = button.dataset.gender;
      }

    });

  });


  // ==========================
  // FORMULÁRIO
  // ==========================

  if (form) {

    form.addEventListener("submit", (event) => {

      event.preventDefault();


      const usernameInput =
        document.querySelector("#username");

      const passwordInput =
        document.querySelector("#password");

      const selects =
        document.querySelectorAll(".birthday select");


      const username =
        usernameInput.value.trim();

      const password =
        passwordInput.value;

      const mes =
        selects[0].value;

      const dia =
        selects[1].value;

      const ano =
        selects[2].value;


      // ==========================
      // VERIFICA DATA
      // ==========================

      if (
        mes === "" ||
        dia === "" ||
        ano === ""
      ) {

        mostrarMensagem(
          "Selecione sua data de nascimento.",
          "erro"
        );

        return;
      }


      // ==========================
      // VERIFICA USUÁRIO
      // ==========================

      if (username.length < 3) {

        mostrarMensagem(
          "O usuário precisa ter pelo menos 3 caracteres.",
          "erro"
        );

        usernameInput.focus();

        return;
      }


      if (username.length > 20) {

        mostrarMensagem(
          "O usuário pode ter no máximo 20 caracteres.",
          "erro"
        );

        usernameInput.focus();

        return;
      }


      const usernameRegex =
        /^[a-zA-Z0-9_]+$/;


      if (!usernameRegex.test(username)) {

        mostrarMensagem(
          "O usuário pode conter apenas letras, números e _.",
          "erro"
        );

        usernameInput.focus();

        return;
      }


      // ==========================
      // VERIFICA SENHA
      // ==========================

      if (password.length < 8) {

        mostrarMensagem(
          "A senha precisa ter pelo menos 8 caracteres.",
          "erro"
        );

        passwordInput.focus();

        return;
      }


      // ==========================
      // GÊNERO
      // ==========================

      const genero =
        genderInput && genderInput.value
          ? genderInput.value
          : "Não informado";


      // ==========================
      // CADASTRO DE DEMONSTRAÇÃO
      // ==========================

      console.log("Cadastro realizado:", {
        username: username,
        nascimento: `${dia}/${mes}/${ano}`,
        genero: genero
      });


      // ==========================
      // MOSTRA SUCESSO
      // ==========================

      mostrarMensagem(
        "Cadastro realizado com sucesso!",
        "sucesso"
      );


      // Limpa o formulário

      form.reset();


      genderButtons.forEach((btn) => {
        btn.classList.remove("selected");
      });


      if (genderInput) {
        genderInput.value = "";
      }

    });

  }


  // ==========================
  // FUNÇÃO DE MENSAGEM
  // ==========================

  function mostrarMensagem(texto, tipo) {

    const antiga =
      document.querySelector(".form-message");


    if (antiga) {
      antiga.remove();
    }


    const mensagem =
      document.createElement("p");


    mensagem.className =
      `form-message ${tipo}`;


    mensagem.textContent =
      texto;


    if (form) {
      form.prepend(mensagem);
    }

  }

});