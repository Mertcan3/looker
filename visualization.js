looker.plugins.visualizations.add({
  id: "testimonialSlider",
  label: "Testimonial Slider",
  options: {
    fontSize: {
      type: "string",
      label: "Font Size",
      default: "18px"
    },
    transitionTime: {
      type: "number",
      label: "Transition Time (ms)",
      default: 3000
    }
  },
  create: function(element, config) {
    element.innerHTML = `
      <div id="testimonial-container" style="display: flex; flex-direction: column; align-items: center; width: 100%; padding: 20px; font-family: Arial, sans-serif;">
        <div id="testimonial-box" style="width: 80%; padding: 20px; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); background: #fff; text-align: center; min-height: 100px;">
          <p id="testimonial-text" style="font-size: ${config.fontSize}; font-weight: 500; color: #333;"></p>
        </div>
        <p id="testimonial-author" style="margin-top: 10px; font-style: italic; color: #666;"></p>
      </div>
    `;
  },
  updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
    let displayText = document.getElementById("testimonial-text");
    let displayAuthor = document.getElementById("testimonial-author");

    if (!data.length) {
      displayText.innerText = "Henüz yorum bulunmamaktadır.";
      displayAuthor.innerText = "";
      return doneRendering();
    }

    let index = 0;
    function updateTestimonial() {
      let row = data[index];
      let comment = row[Object.keys(row)[0]].value;
      let author = row[Object.keys(row)[1]] ? row[Object.keys(row)[1]].value : "Anonim";

      displayText.innerText = `"${comment}"`;
      displayAuthor.innerText = `- ${author}`;

      index = (index + 1) % data.length;
    }

    updateTestimonial();
    setInterval(updateTestimonial, config.transitionTime || 3000);

    doneRendering();
  }
});