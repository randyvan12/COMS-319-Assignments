// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

function incrementValue(e) {
  e.preventDefault();
  var fieldName = $(e.target).data("field");
  var parent = $(e.target).closest("div");
  var currentVal = parseInt(
    parent.find("input[name=" + fieldName + "]").val(),
    10
  );

  if (!isNaN(currentVal)) {
    parent.find("input[name=" + fieldName + "]").val(currentVal + 1);
  } else {
    parent.find("input[name=" + fieldName + "]").val(0);
  }
}

function decrementValue(e) {
  e.preventDefault();
  var fieldName = $(e.target).data("field");
  var parent = $(e.target).closest("div");
  var currentVal = parseInt(
    parent.find("input[name=" + fieldName + "]").val(),
    10
  );

  if (!isNaN(currentVal) && currentVal > 0) {
    parent.find("input[name=" + fieldName + "]").val(currentVal - 1);
  } else {
    parent.find("input[name=" + fieldName + "]").val(0);
  }
}

$(".input-group").on("click", ".button-plus", function (e) {
  incrementValue(e);
});

$(".input-group").on("click", ".button-minus", function (e) {
  decrementValue(e);
});

$(document).ready(function () {
  var quantitiy = 0;
  $(".quantity-right-plus").click(function (e) {
    // Stop acting like a button
    e.preventDefault();
    // Get the field name
    var quantity = parseInt($("#quantity").val());

    // If is not undefined

    $("#quantity").val(quantity + 1);

    // Increment
  });

  $(".quantity-left-minus").click(function (e) {
    // Stop acting like a button
    e.preventDefault();
    // Get the field name
    var quantity = parseInt($("#quantity").val());

    // If is not undefined

    // Increment
    if (quantity > 0) {
      $("#quantity").val(quantity - 1);
    }
  });
});
$('.btn-number').click(function(e){
    e.preventDefault();
    
    fieldName = $(this).attr('data-field');
    type      = $(this).attr('data-type');
    var input = $("input[name='"+fieldName+"']");
    var currentVal = parseInt(input.val());
    if (!isNaN(currentVal)) {
        if(type == 'minus') {
            
            if(currentVal > input.attr('min')) {
                input.val(currentVal - 1).change();
            } 
            if(parseInt(input.val()) == input.attr('min')) {
                $(this).attr('disabled', true);
            }

        } else if(type == 'plus') {

            if(currentVal < input.attr('max')) {
                input.val(currentVal + 1).change();
            }
            if(parseInt(input.val()) == input.attr('max')) {
                $(this).attr('disabled', true);
            }

        }
    } else {
        input.val(0);
    }
});

