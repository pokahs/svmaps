$(document).ready(function() {
  fetch('data.json')
      .then(response => response.json())
      .then(data => {
          const tableBody = $('#mapartTable tbody');
          
          data.forEach(item => {
              const row = `
                  <tr>
                      <td>${item.name}</td>
                      <td><img src="${item.mapart}" alt="${item.name}" width="100" onclick="openModal(this)"></td>
                      <td>${item.artists}</td>
                      <td>${item.notes}</td>
                  </tr>
              `;
              tableBody.append(row);
          });

          // Initialize DataTables
          $('#mapartTable').DataTable({
            columnDefs: [
              { orderable: false, targets: [1, 3]}
            ],
            language: {
              lengthMenu: "Show _MENU_ entries per page"
            }
          });
      })
      .catch(error => console.error('Error fetching data:', error));
});


$('#columnSelect').on('change', function() {
  const table = $('#mapartTable').DataTable();
  const selectedColumn = $(this).val();

  // Update search based on column selection
  $('#creatorFilter').on('keyup', function() {
      const searchTerm = $(this).val().toLowerCase();

      if (selectedColumn === "") {
          // If no column is selected, search all columns
          table.search(searchTerm).draw();
      } else {
          // If a specific column is selected, search only that column
          table.columns(selectedColumn).search(searchTerm).draw();
      }
  });
});


function filterByCreator() {
  const input = document.getElementById("creatorFilter").value.toLowerCase();
  const table = $('#mapartTable').DataTable();
  
  // Filter the third column (index 2) for the creators
  table.column(2).search(input).draw();
}


function openModal(imgElement) {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const captionText = document.getElementById("caption");

  modal.style.display = "block";
  modalImg.src = imgElement.src;
  captionText.innerHTML = imgElement.alt; // Display the image's alt text as the caption
}


function closeModal() {
  const modal = document.getElementById("imageModal");
  modal.style.display = "none";
}

const html = document.querySelector('html');
html.classList.toggle('dark');