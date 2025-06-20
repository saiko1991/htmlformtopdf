document.addEventListener('DOMContentLoaded', function () {
    // Image upload functionality
    const frontImageInput = document.getElementById('front-image');
    const backImageInput = document.getElementById('back-image');
    const frontPreview = document.getElementById('front-preview');
    const backPreview = document.getElementById('back-preview');

    let frontPlaceholder;
    let backPlaceholder;
    if (frontImageInput) {
        frontPlaceholder = frontImageInput.parentElement;
        frontImageInput.addEventListener('change', function (e) {
            handleImageUpload(e, frontPreview, frontPlaceholder);
        });
    }

    if (backImageInput) {
        backPlaceholder = backImageInput.parentElement;
        backImageInput.addEventListener('change', function (e) {
            handleImageUpload(e, backPreview, backPlaceholder);
        });
    }

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
    if (resetBtn) {
        resetBtn.addEventListener('click', function () {
            document.getElementById('job-card-form').reset();
            if (frontPreview) {
                frontPreview.src = '';
                frontPreview.style.display = 'none';
            }
            if (backPreview) {
                backPreview.src = '';
                backPreview.style.display = 'none';
            }
            if (frontPlaceholder) {
                frontPlaceholder.classList.remove('has-image');
            }
            if (backPlaceholder) {
                backPlaceholder.classList.remove('has-image');
            }
        });
    }

    // Save as PDF functionality
    const savePdfBtn = document.getElementById('save-pdf-btn');
    if (savePdfBtn) {
        savePdfBtn.addEventListener('click', generatePDF);
    }

    function generatePDF() {
        if (!savePdfBtn) return;
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