(function () {
  var form = document.getElementById("diagnosis-form");
  var successPanel = document.getElementById("form-success");
  if (!form) return;

  var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setError(fieldId, message) {
    var errorEl = document.getElementById("error-" + fieldId);
    if (errorEl) errorEl.textContent = message || "";
  }

  function markInvalid(el, invalid) {
    if (!el) return;
    if (invalid) {
      el.setAttribute("aria-invalid", "true");
    } else {
      el.removeAttribute("aria-invalid");
    }
  }

  function validateRequiredText(id, message) {
    var el = document.getElementById(id);
    var invalid = el.value.trim() === "";
    markInvalid(el, invalid);
    setError(id, invalid ? message : "");
    return !invalid;
  }

  function validateEmail() {
    var el = document.getElementById("email");
    var value = el.value.trim();
    var invalid = value === "" || !EMAIL_PATTERN.test(value);
    markInvalid(el, invalid);
    setError("email", invalid ? "正しいメールアドレスを入力してください" : "");
    return !invalid;
  }

  function validateSelect(id, message) {
    var el = document.getElementById(id);
    var invalid = el.value === "";
    markInvalid(el, invalid);
    setError(id, invalid ? message : "");
    return !invalid;
  }

  function validateRadioGroup(name, message) {
    var checked = form.querySelector('input[name="' + name + '"]:checked');
    setError(name, checked ? "" : message);
    return !!checked;
  }

  function validateCheckboxGroupAtLeastOne(name, errorId, message) {
    var checked = form.querySelectorAll('input[name="' + name + '"]:checked');
    setError(errorId, checked.length > 0 ? "" : message);
    return checked.length > 0;
  }

  function validateConsent() {
    var el = document.getElementById("consent");
    var invalid = !el.checked;
    setError("consent", invalid ? "プライバシーポリシーへの同意が必要です" : "");
    return !invalid;
  }

  function collectFormData() {
    var formData = new FormData(form);
    var data = {};
    formData.forEach(function (value, key) {
      if (key === "sns" || key === "issues") {
        data[key] = data[key] || [];
        data[key].push(value);
      } else {
        data[key] = value;
      }
    });
    return data;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var validations = [
      validateRequiredText("company", "会社・店舗名を入力してください"),
      validateRequiredText("name", "ご担当者名を入力してください"),
      validateEmail(),
      validateSelect("industry", "業種を選択してください"),
      validateRadioGroup("gmbStatus", "Googleマイビジネスの掲載状況を選択してください"),
      validateCheckboxGroupAtLeastOne("sns", "sns", "診断を希望するSNSを1つ以上選択してください"),
      validateRequiredText("accounts", "SNSアカウントのURL・IDを入力してください"),
      validateRadioGroup("deliveryMethod", "診断結果の受け取り方法を選択してください"),
      validateConsent()
    ];

    var isValid = validations.every(Boolean);

    if (!isValid) {
      var firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (!firstInvalid) {
        var firstErrorText = form.querySelector(".field__error");
        firstInvalid = firstErrorText && firstErrorText.textContent
          ? firstErrorText.closest("fieldset") || firstErrorText
          : null;
      }
      if (firstInvalid && firstInvalid.focus) firstInvalid.focus();
      if (firstInvalid && firstInvalid.scrollIntoView) {
        firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    var payload = collectFormData();

    // NOTE: This is a static portfolio sample with no backend.
    // In production, replace this block with an actual submission, e.g.:
    //   fetch("/api/sns-diagnosis", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(payload)
    //   });
    // or point the request at a Google Apps Script / CRM webhook endpoint.
    console.log("SNS diagnosis form submission:", payload);

    form.hidden = true;
    successPanel.hidden = false;
    successPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // Clear a field's error state as soon as the user fixes it.
  form.addEventListener("input", function (event) {
    var target = event.target;
    if (target.hasAttribute("aria-invalid")) {
      if (target.type === "checkbox" || target.type === "radio") return;
      if (target.value.trim() !== "") {
        markInvalid(target, false);
        setError(target.id, "");
      }
    }
  });

  form.addEventListener("change", function (event) {
    var target = event.target;
    if (target.name === "sns") {
      validateCheckboxGroupAtLeastOne("sns", "sns", "診断を希望するSNSを1つ以上選択してください");
    }
    if (target.name === "gmbStatus" || target.name === "deliveryMethod") {
      setError(target.name, "");
    }
    if (target.id === "consent" && target.checked) {
      setError("consent", "");
    }
    if (target.tagName === "SELECT" && target.value !== "") {
      markInvalid(target, false);
      setError(target.id, "");
    }
  });
})();
