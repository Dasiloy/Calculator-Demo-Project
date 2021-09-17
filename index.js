$(document).ready(function () {
  //validate UK postcode
  const newFunction = (str) => {
    regexp =
      /^[A-Z]{1,2}[0-9RCHNQ][0-9A-Z]?\s?[0-9][ABD-HJLNP-UW-Z]{2}$|^[A-Z]{2}-?[0-9]{4}$/;

    if (regexp.test(str)) {
      return str;
    } else {
      return false;
    }
  };

  const checkvalue = (words) => {
    let brief = $("#" + words).val();
    if (brief.includes("£")) {
      return brief.replace("£", "");
    } else {
      return brief;
    }
  };

  const select = (Option) => {
    let brief = $("#" + Option).val();
    if (brief.includes("demolish")) {
      return (brief = " demolition");
    } else if (brief.includes("refublish")) {
      return (brief = "refurbish");
    } else if (brief.includes("premium")) {
      return (brief = "premium");
    } else if (brief.includes("medium")) {
      return (brief = "medium");
    } else if (brief.includes("basic")) {
      return (brief = "basic");
    } else if (brief.includes("flats")) {
      return (brief = " block_of_flats");
    } else {
      return brief;
    }
  };

  //hide and show elements on page
  $("#show_more").click(function () {
    $(this).hide();
    $("#divider").addClass("show");
    $("#hidden_fields").addClass("show");
  });

  //hide result
  $("#reset_btn").click(function () {
    $("#calc_values").removeClass("show_now");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  //validate and submit inputs
  $("#btn_submit").click(async function (e) {
    e.preventDefault();
    $(this).attr("disabled", true);
    let post_val = newFunction(
      $("#postcode").val().toString().toUpperCase()
    );
    let post_dev = $("#post_development").val();
    let pre_dev = $("#pre_development").val();

    let price_input = checkvalue("purchase_price");
    let gdv = checkvalue("gdv");
    let com = checkvalue("com");
    let proj_type = select("project_type");
    let prop_Type = select("property_type");
    let fin_qaulity = select("finished_quality");
    let stam_duty = select("stamp_duty");
    let archic = select("architect");
    let legal = select("legals");
    let contig = select("contingency");
    let fin_cost = select("finance_cost");
    const url =
      "https://api.propertydata.co.uk/development-calculator?key=NMTU5ZZXRE&postcode=" +
      post_val +
      "&purchase_price=" +
      price_input +
      "&sqft_pre_development=" +
      pre_dev +
      "&sqft_post_development=" +
      post_dev +
      "&project_type=" +
      proj_type +
      "&property_type=" +
      prop_Type +
      "&finish_quality=" +
      fin_qaulity +
      "";
    const fetchData = async (url) => {
      const data = await fetch(url)
        .then((res) => res.json())
        .catch((err) => {
          console.log(error);
        });
      return data;
    };
    const holdData = await fetchData(url);
    if (holdData.status === "error") {
      alert(holdData.message);
      $(this).attr("disabled", false);
    } else if (holdData.status === "success") {
      const newData = holdData.results;
      let judgement_table = "";
      if (newData.profit.value.includes("-")) {
        judgement_table = "danger";
      } else {
        judgement_table = "success";
      }

      console.log(judgement_table, newData);

      let table_1 = "<table>";
      table_1 += "<tr>";
      table_1 += "<td>purchase price</td>";
      table_1 +=
        "<td class='table_right'>" +
        "&#163;" +
        newData.purchasePrice.value +
        "</td></tr>";
      table_1 += "<tr>";
      table_1 += "<td>stamp duty</td>";
      table_1 +=
        "<td>" +
        "<span class='flex'>1 <span class='details'>&#163; " +
        newData.stampDuty.value +
        "</span></span>";
      ("</td></tr>");
      table_1 += "<tr>";
      table_1 += "<td>legals</td>";
      table_1 +=
        "<td class='table_right'>" +
        "&#163;" +
        newData.legals.value +
        "</td></tr>";
      table_1 += "<tr>";
      table_1 += "<td>architects</td>";
      table_1 +=
        "<td>" +
        "<span class='flex'>2 <span class='details'>&#163; " +
        newData.architects.value +
        "</span></span>";
      ("</td></tr>");
      table_1 += "<tr>";
      table_1 += "<td>refurbishment</td>";
      table_1 +=
        "<td>" +
        "<span class='flex'>3 <span class='details'>&#163; " +
        newData.refurbishment.value +
        "</span></span>";
      ("</td></tr>");
      table_1 += "<tr>";
      table_1 += "<td>new construction</td>";
      table_1 +=
        "<td>" +
        "<span class='flex'>4 <span class='details'>&#163; " +
        newData.construction.value +
        "</span></span>";
      ("</td></tr>");
      table_1 += "<tr class='table_bold'>";
      table_1 += "<td>sub total</td>";
      table_1 +=
        "<td class='table_right'>" +
        "&#163;" +
        newData.subTotalCosts.value +
        "</td></tr></table>";

      let table_2 = "<table>";
      table_2 += "<tr>";
      table_2 += "<td>contingency</td>";
      table_2 +=
        "<td>" +
        "<span class='flex'>5 <span class='details'>&#163; " +
        newData.contingency.value +
        "</span></span>";
      ("</td></tr>");
      table_2 += "<tr>";
      table_2 += "<td>finance costs</td>";
      table_2 +=
        "<td>" +
        "<span class='flex'>6 <span class='details'>&#163; " +
        newData.finance.value +
        "</span></span>";
      ("</td></tr>");
      table_2 += "<tr class='table_bold'>";
      table_2 += "<td> total costs</td>";
      table_2 +=
        "<td class='table_right'> " +
        "&#163;" +
        newData.totalCosts.value +
        "</td></tr></table>";

      let table_3 = "<table>";
      table_3 += "<tr>";
      table_3 += "<td>Value £/sqft</td>";
      table_3 +=
        "<td>" +
        "<span class='flex'>7 <span class='details'>&#163; " +
        newData.valuePsf.value +
        "</span></span>";
      ("</td></tr>");
      table_3 += "<tr class='table_bold'>";
      table_3 += "<td>Total value</td>";
      table_3 +=
        "<td class='table_right'>" +
        "&#163;" +
        newData.totalValue.value +
        "</td></tr></table>";

      let table_4 = "<table class=" + judgement_table + ">";
      table_4 += "<tr>";
      table_4 += "<td>profit</td>";
      table_4 +=
        "<td class='table_right'>" +
        "&#163;" +
        newData.profit.value +
        "</td></tr>";
      table_4 += "<tr>";
      table_4 += "<td>profit %</td>";
      table_4 +=
        "<td class='table_right'>" +
        "&#163;" +
        newData.profitPc.value +
        "</td></tr></table>";

      let stamp_note = newData.stampDuty.note;
      let arc_note = newData.architects.note;
      let ref_note = newData.refurbishment.note;
      let con_note = newData.construction.note;
      let contin_note = newData.contingency.note;
      let fin_note = newData.finance.note;
      let psf_note = newData.valuePsf.note;

      $("#table_1").html(table_1);
      $("#table_2").html(table_2);
      $("#table_3").html(table_3);
      $("#table_4").html(table_4);

      $("#p_1").text(stamp_note);
      $("#p_2").text(arc_note);
      $("#p_3").text(ref_note);
      $("#p_4").text(con_note);
      $("#p_5").text(contin_note);
      $("#p_6").text(fin_note);
      $("#p_7").text(psf_note);

      $("#calc_values").addClass("show_now");
      $(this).attr("disabled", false);
    }
  });
});
