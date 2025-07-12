  // Modal functionality
        const openModalBtn = document.getElementById('openModalBtn');
        const closeModalBtn = document.getElementById('closeModalBtn');
        const cancelBtn = document.getElementById('cancelBtn');
        const modalOverlay = document.getElementById('modalOverlay');
        const modal = document.getElementById('addNoteModal');
        
        // Open modal
        openModalBtn.addEventListener('click', () => {
            modalOverlay.classList.add('active');
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        // Close modal (all methods)
        function closeModal() {
            modalOverlay.classList.remove('active');
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        closeModalBtn.addEventListener('click', closeModal);
        cancelBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', closeModal);
        
        // Category selection
        const categoryBtns = document.querySelectorAll('.category-btn');
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
        
       