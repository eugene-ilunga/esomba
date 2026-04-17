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

  function setEmailOnlyUi() {
    var $registerDiv = $("#register_div[data-registration-mode='email']");
    var $signUpForm = $registerDiv.find("#sign-up-form");
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
      $mobileLoginInput.removeAttr("required");
    }

    $("#email-form").removeClass("d-none").show();
    if ($emailLoginInput.length) {
      $emailLoginInput.attr("required", "required");
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
            $form[0].reset();
            $("#mobile-form").addClass("d-none");
            $("#email-form").removeClass("d-none").show();
            if ($emailLoginInput.length) {
              $emailLoginInput.val(email);
            }
            $("#sign-up-error").html(
              '<div class="alert alert-success">' + result.message + "</div>",
            );
            fireToast("success", result.message);
            return;
          }

          $("#sign-up-error").html(
            '<div class="alert alert-danger">' + result.message + "</div>",
          );
          fireToast("error", result.message);
        },
        error: function (xhr) {
          var errorMessage = extractErrorMessage(
            xhr,
            "Registration failed. Please try again.",
          );

          $submitBtn.attr("disabled", false).html(submitBtnHtml);
          $("#sign-up-error").html(
            '<div class="alert alert-danger">' + errorMessage + "</div>",
          );
          fireToast("error", errorMessage);
        },
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
    bindForgotPassword();
  }

  if (document.readyState === "complete") {
    initRegisterEmailAuth();
  } else {
    window.addEventListener("load", initRegisterEmailAuth);
  }
})(window.jQuery);
