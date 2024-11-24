<template>
    <div class="p-6">
        <section class="bg-white p-6 rounded shadow mb-8">
            <h1 class="text-2xl font-bold mb-4">Certificate of Completion</h1>

            <div class="mb-6">
                <p class="text-lg"><strong>Participant:</strong> {{ certificate?.participantName }}</p>
                <p class="text-lg"><strong>Course:</strong> {{ certificate?.courseName }}</p>
                <p class="text-lg"><strong>Completed On:</strong> {{ certificate?.completionDate }}</p>
            </div>

            <button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded" @click="downloadCertificate">
                Download Certificate
            </button>
        </section>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { jsPDF } from 'jspdf';

interface Certificate {
    participantName: string;
    courseName: string;
    completionDate: string;
}

export default defineComponent({
    setup() {
        const route = useRoute();
        const certificate = ref<Certificate | null>(null);

        const fetchCertificate = async () => {
            const mockCertificate: Certificate = {
                participantName: 'John Doe',
                courseName: 'Vue.js for Beginners',
                completionDate: 'November 24, 2024',
            };

            certificate.value = mockCertificate;
        };

        const downloadCertificate = () => {
            if (!certificate.value) return;

            const doc = new jsPDF();
            doc.text('Certificate of Completion', 20, 20);
            doc.text(`Participant: ${certificate.value.participantName}`, 20, 30);
            doc.text(`Course: ${certificate.value.courseName}`, 20, 40);
            doc.text(`Completed On: ${certificate.value.completionDate}`, 20, 50);

            doc.save(`${certificate.value.courseName}_Certificate.pdf`);
        };


        onMounted(() => {
            fetchCertificate();
        });

        return { certificate, downloadCertificate };
    },
});
</script>

<style scoped>
.bg-white {
    background-color: white;
}
</style>
