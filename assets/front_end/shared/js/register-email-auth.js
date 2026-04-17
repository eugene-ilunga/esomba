(function ($) {
  "use strict";

  if (!$) {
    return;
  }

  function fireToast(icon, title) {
    if (window.Toast && typeof window.Toast.fire === "function") {
      window.Toast.fire({
        icon: icon,
        title: title,
      });
    }
  }

  function updateCsrf(result) {
    if (result && result.csrfName) {
      window.csrfName = result.csrfName;
    }
    if (result && result.csrfHash) {
      window.csrfHash = result.csrfHash;
    }
  }

  function extractErrorMessage(xhr, fallbackMessage) {
    var responseText = xhr && xhr.responseText ? String(xhr.responseText) : "";
    var plainText = responseText
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (xhr && xhr.responseJSON && xhr.responseJSON.message) {
      return xhr.responseJSON.message;
    }

    if (plainText) {
      return plainText.slice(0, 220);
    }

    return fallbackMessage;
  }

  function setMessage($box, message, type) {
    if (!$box || !$box.length) {
      return;
    }

    if (!message) {
      $box.html("");
      return;
    }

    $box.html(
      '<div class="alert alert-' + (type === "success" ? "success" : "danger") + '">' +
        message +
        "</div>",
    );
  }

  function syncCartAndRedirect() {
    var redirectUrl = base_url + "my-account";

    try {
      if (window.localStorage && localStorage.getItem("cart") && typeof window.cart_sync === "function") {
        var syncResult = window.cart_sync();
        if (syncResult && typeof syncResult.then === "function") {
          syncResult
            .then(function () {
              window.location.href = redirectUrl;
            })
            .catch(function () {
              window.location.href = redirectUrl;
            });
          return;
        }
      }
    } catch (error) {
      // Ignore cart sync issues and continue redirecting.
    }

    window.location.href = redirectUrl;
  }

  function loginWithEmail(credentials, callbacks) {
    var options = callbacks || {};

    $.ajax({
      type: "POST",
      url: base_url + "home/login",
      data: {
        identity: credentials.identity,
        password: credentials.password,
        type: "email",
        [csrfName]: csrfHash,
      },
      dataType: "json",
      beforeSend: function () {
        if (typeof options.beforeSend === "function") {
          options.beforeSend();
        }
      },
      success: function (result) {
        updateCsrf(result);

        if (result.error === false) {
          if (typeof options.onSuccess === "function") {
            options.onSuccess(result);
          }
          return;
        }

        if (typeof options.onError === "function") {
          options.onError(result.message || "Unable to log you in.");
        }
      },
      error: function (xhr) {
        if (typeof options.onError === "function") {
          options.onError(
            extractErrorMessage(xhr, "Unable to log you in."),
          );
        }
      },
    });
  }

  function setEmailOnlyUi() {
    var $registerDiv = $("#register_div[data-registration-mode='email']");
    var $signUpForm = $registerDiv.find("#sign-up-form");
    var $pageLoginForm = $registerDiv
      .closest(".register-login-section")
      .find(".login-section form.form-submit-event")
      .first();
    var $emailLoginInput = $("#email-form")
      .find("input[name='identity'], input[type='email']")
      .first();
    var $mobileLoginInput = $("#mobile-form").find("input[name='identity']").first();

    if (!$registerDiv.length || !$signUpForm.length) {
      return;
    }

    $registerDiv.find("#send-otp-form").hide().addClass("d-none");
    $registerDiv.find("#verify-otp-form").hide().addClass("d-none");
    $signUpForm.show().css("display", "block");

    if (!$signUpForm.find("input[name='type'][value='email']").length) {
      $signUpForm.append('<input type="hidden" name="type" value="email">');
    }

    $("#mobile-form").addClass("d-none");
    if ($mobileLoginInput.length) {
      $mobileLoginInput.attr("data-login-name", $mobileLoginInput.attr("name") || "");
      $mobileLoginInput.removeAttr("name");
      $mobileLoginInput.removeAttr("required");
    }

    $("#email-form").removeClass("d-none").show();
    if ($emailLoginInput.length) {
      $emailLoginInput.attr("name", "identity");
      $emailLoginInput.attr("required", "required");
    }

    if ($pageLoginForm.length && !$pageLoginForm.find("input[name='type']").length) {
      $pageLoginForm.append('<input type="hidden" name="type" value="email">');
    }

    $("#send_forgot_password_otp_form").hide();
    $("#verify_forgot_password_otp_form").addClass("d-none").hide();
    $("#forgot-password-phone-div").addClass("d-none").hide();
    $("#forgot-password-email-link").addClass("d-none").hide();

    if ($("#forgot-password-email-form").length) {
      $("#forgot-password-email-form").removeClass("d-none").show();
    }
  }

  function bindEmailSignup() {
    $(document).off("submit", ".sign-up-form");
    $(document).off("submit", "#sign-up-form");

    $(document).on("submit", "#sign-up-form", function (e) {
      var $form = $(this);
      var email = $form.find("input[name='email']").val();
      var password = $form.find("input[name='password']").val();
      var confirmPassword = $form.find("input[name='confirm_password']").val();
      var username = $form.find("input[name='username']").val();
      var friendsCode = $form.find("input[name='friends_code']").val();
      var referralCode = $form.find("input[name='referral_code']").val();
      var webFcm = $("#web_fcm").val() || "";
      var $submitBtn = $form.find("button[type='submit']").first();
      var submitBtnHtml = $submitBtn.html();

      e.preventDefault();

      if (!password || password.length < 8) {
        fireToast("error", "Password must be at least 8 characters long.");
        return;
      }

      if (confirmPassword && password !== confirmPassword) {
        fireToast("error", "Password and Confirm Password do not match.");
        return;
      }

      $.ajax({
        type: "POST",
        url: base_url + "auth/register_user",
        data: {
          name: username,
          email: email,
          password: password,
          confirm_password: confirmPassword,
          type: "email",
          web_fcm: webFcm,
          friends_code: friendsCode,
          referral_code: referralCode,
          [csrfName]: csrfHash,
        },
        dataType: "json",
        beforeSend: function () {
          $("#sign-up-error").html("");
          $submitBtn.attr("disabled", true).html("Please Wait...");
        },
        success: function (result) {
          var $emailLoginInput = $("#email-form")
            .find("input[name='identity'], input[type='email']")
            .first();

          updateCsrf(result);
          $submitBtn.attr("disabled", false).html(submitBtnHtml);

          if (result.error === false) {
            setMessage(
              $("#sign-up-error"),
              "Account created. Signing you in...",
              "success",
            );

            loginWithEmail(
              {
                identity: email,
                password: password,
              },
              {
                beforeSend: function () {
                  $submitBtn.attr("disabled", true).html("Signing in...");
                },
                onSuccess: function () {
                  $form[0].reset();
                  $("#mobile-form").addClass("d-none");
                  $("#email-form").removeClass("d-none").show();
                  if ($emailLoginInput.length) {
                    $emailLoginInput.val(email);
                  }
                  fireToast("success", result.message);
                  syncCartAndRedirect();
                },
                onError: function (message) {
                  $submitBtn.attr("disabled", false).html(submitBtnHtml);
                  setMessage($("#sign-up-error"), message, "error");
                  fireToast("error", message);
                },
              },
            );
            return;
          }

          setMessage($("#sign-up-error"), result.message, "error");
          fireToast("error", result.message);
        },
        error: function (xhr) {
          var errorMessage = extractErrorMessage(
            xhr,
            "Registration failed. Please try again.",
          );

          $submitBtn.attr("disabled", false).html(submitBtnHtml);
          setMessage($("#sign-up-error"), errorMessage, "error");
          fireToast("error", errorMessage);
        },
      });
    });
  }

  function bindEmailLogin() {
    var $registerLoginSection = $("#register_div[data-registration-mode='email']")
      .closest(".register-login-section");
    var $loginForms = $registerLoginSection.find(".login-section form.form-submit-event");

    if (!$loginForms.length) {
      return;
    }

    $loginForms.each(function () {
      var $form = $(this);

      if ($.fn.validate && typeof $form.validate === "function") {
        try {
          $form.validate().destroy();
        } catch (error) {
          // Ignore validator teardown failures and continue with direct handling.
        }
      }

      $form.attr("novalidate", "novalidate");
      $form.off("submit.registerEmailAuth");
      $form.on("submit.registerEmailAuth", function (e) {
        var $currentForm = $(this);
        var $identityInput = $currentForm
          .find("input[name='identity'], input[name='email']")
          .filter(":visible")
          .first();
        var identity = $.trim($identityInput.val() || "");
        var password = $.trim(
          $currentForm.find("input[name='password']").filter(":visible").val() || "",
        );
        var $submitBtn = $currentForm.find(".submit_btn, button[type='submit']").first();
        var submitBtnHtml = $submitBtn.html();
        var $errorBox = $currentForm.find("#error_box, #error_box_email").first();

        e.preventDefault();
        e.stopImmediatePropagation();

        if (!identity || !password) {
          setMessage($errorBox, "Email and password are required.", "error");
          fireToast("error", "Email and password are required.");
          return;
        }

        loginWithEmail(
          {
            identity: identity,
            password: password,
          },
          {
            beforeSend: function () {
              setMessage($errorBox, "", "success");
              $submitBtn.attr("disabled", true).html("Please Wait...");
            },
            onSuccess: function (result) {
              $submitBtn.attr("disabled", false).html(submitBtnHtml);
              setMessage($errorBox, result.message, "success");
              fireToast("success", result.message);
              syncCartAndRedirect();
            },
            onError: function (message) {
              $submitBtn.attr("disabled", false).html(submitBtnHtml);
              setMessage($errorBox, message, "error");
              fireToast("error", message);
            },
          },
        );
      });
    });
  }

  function bindForgotPassword() {
    var $forgotForm = $("#forgot-password-email-form");

    if (!$forgotForm.length) {
      return;
    }

    $forgotForm.off("submit");
    $forgotForm.on("submit", function (e) {
      var email = $("#forgot_password_email").val();
      var $submitBtn = $("#send_firebase_reset_email_btn");

      e.preventDefault();

      if (!email) {
        $("#forgot_pass_email_error_box").html(
          '<span class="text-danger">Please enter your email.</span>',
        );
        return;
      }

      $submitBtn.attr("disabled", true).text("Sending...");

      $.ajax({
        type: "POST",
        url: base_url + "auth/forgot_password",
        data: {
          email: email,
          [csrfName]: csrfHash,
        },
        dataType: "json",
        success: function (result) {
          updateCsrf(result);
          $("#forgot_pass_email_error_box").html(
            '<span class="' +
              (result.error ? "text-danger" : "text-success") +
              '">' +
              result.message +
              "</span>",
          );
          $submitBtn.attr("disabled", false).text("Send Reset Email");
        },
        error: function (xhr) {
          var errorMessage = extractErrorMessage(
            xhr,
            "Unable to send reset email.",
          );

          $("#forgot_pass_email_error_box").html(
            '<span class="text-danger">' + errorMessage + "</span>",
          );
          $submitBtn.attr("disabled", false).text("Send Reset Email");
          fireToast("error", errorMessage);
        },
      });
    });
  }

  function initRegisterEmailAuth() {
    if (!$("#register_div[data-registration-mode='email']").length) {
      return;
    }

    setEmailOnlyUi();
    bindEmailSignup();
    bindEmailLogin();
    bindForgotPassword();
  }

  if (document.readyState === "complete") {
    initRegisterEmailAuth();
  } else {
    window.addEventListener("load", initRegisterEmailAuth);
  }
})(window.jQuery);
