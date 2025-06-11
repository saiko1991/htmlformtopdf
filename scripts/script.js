document.addEventListener('DOMContentLoaded', function () {
    // Image upload functionality
    const frontImageInput = document.getElementById('front-image');
    const backImageInput = document.getElementById('back-image');
    const frontPreview = document.getElementById('front-preview');
    const backPreview = document.getElementById('back-preview');
    const frontPlaceholder = frontImageInput.parentElement;
    const backPlaceholder = backImageInput.parentElement;

    frontImageInput.addEventListener('change', function (e) {
        handleImageUpload(e, frontPreview, frontPlaceholder);
    });

    backImageInput.addEventListener('change', function (e) {
        handleImageUpload(e, backPreview, backPlaceholder);
    });

    function handleImageUpload(event, previewElement, placeholder) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewElement.src = e.target.result;
                previewElement.style.display = 'block';
                placeholder.classList.add('has-image');
            };
            reader.readAsDataURL(file);
        }
    }

    // Reset form functionality
    const resetBtn = document.getElementById('reset-form-btn');
    resetBtn.addEventListener('click', function () {
        document.getElementById('job-card-form').reset();
        frontPreview.src = '';
        frontPreview.style.display = 'none';
        backPreview.src = '';
        backPreview.style.display = 'none';
        frontPlaceholder.classList.remove('has-image');
        backPlaceholder.classList.remove('has-image');
    });

    // Save as PDF functionality
    const savePdfBtn = document.getElementById('save-pdf-btn');
    savePdfBtn.addEventListener('click', generatePDF);

    function generatePDF() {
        // Show loading state
        savePdfBtn.disabled = true;
        savePdfBtn.textContent = 'Generating PDF...';

        // Options for PDF generation
        const element = document.getElementById('pdf-content');
        const opt = {
            margin: 10,
            filename: 'job_card.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                logging: false,
                useCORS: true,
                allowTaint: true,
                scrollX: 0,
                scrollY: 0
            },
            jsPDF: {
                unit: 'mm',
                format: 'a4',
                orientation: 'portrait'
            }
        };

        // Generate PDF
        html2pdf()
            .set(opt)
            .from(element)
            .save()
            .then(() => {
                // Restore button state
                savePdfBtn.disabled = false;
                savePdfBtn.textContent = 'Print Job Card (PDF)';
            })
            .catch(err => {
                console.error('PDF generation failed:', err);
                savePdfBtn.disabled = false;
                savePdfBtn.textContent = 'Print Job Card (PDF)';
                alert('Failed to generate PDF. Please try again.');
            });
    }
});