document.addEventListener("DOMContentLoaded", async () => {
  const sectionsContainer = document.getElementById("sections");

  // Fetch folder and image data from the server
  const data = await fetch("fetch_images.php").then(res => res.json());

  // Get folder names and sort them Z to A
  const sortedFolders = Object.keys(data).sort((a, b) => b.localeCompare(a));

  // Dynamically create sections for sorted folders
  for (const folder of sortedFolders) {
    const files = data[folder]; // Get files for the current folder
    const section = document.createElement("div");
    section.className = "section";
    section.innerHTML = `
      <button class="toggle-btn">${folder}</button>
      <div class="content" data-folder="${folder}" style="display: none;"></div>
    `;
    sectionsContainer.appendChild(section);

    const button = section.querySelector(".toggle-btn");
    const content = section.querySelector(".content");

    button.addEventListener("click", () => {
      // Close other sections
      document.querySelectorAll(".content").forEach(otherContent => {
        if (otherContent !== content) otherContent.style.display = "none";
      });

      // Toggle current section
      content.style.display = content.style.display === "block" ? "none" : "block";

      // Load images and add click functionality if not already loaded
      if (content.style.display === "block" && !content.dataset.loaded) {
        content.innerHTML = files
          .filter((file) => file.endsWith(".jpg")) // Include only image files
          .map((img) => `
            <div class="image-container" data-image="${img}">
              <img src="images/${folder}/${img}" alt="${img}" loading="lazy">
              <button class="info-btn" style="display: none;">+</button>
              <div class="text-box" style="display: none;">
                <div class="text-content"></div>
              </div>
            </div>
          `)
          .join("");

        content.dataset.loaded = true;
        
        // Add functionality to the info buttons
        content.querySelectorAll(".info-btn").forEach((infoBtn) => {
          infoBtn.style.display = "block";
          infoBtn.addEventListener("click", async (e) => {
            const container = e.target.closest(".image-container");
            const textBox = container.querySelector(".text-box");
            const textContent = textBox.querySelector(".text-content");
            const imageName = container.dataset.image;
            const markdownFile = `images/${folder}/${imageName.replace(".jpg", ".md")}`;
            const imageLarge = `images/${folder}/hi-res/${imageName.replace("-preview.jpg", ".jpg")}`;

            // Fetch and render Markdown content
            if (textBox.style.display === "none") {
              const markdown = await fetch(markdownFile).then((res) =>
                res.ok ? res.text() : "no additional information <br><br>"
              );
              infoBtn.innerText = "-";
              textContent.innerHTML = marked.parse(markdown + `<a href="/${imageLarge}">full size</a>`);
              textBox.style.display = "block";
            } else {
              infoBtn.innerText = "+";
              textBox.style.display = "none"; // Toggle visibility
            }
          });
        });
      }
    });
  }
});
