/* WildlifeWise frontend interactions. The chatbot currently uses a demo response.
   Replace the demo block in handleChatSubmit() with your teammate's Flask/RAG API call. */
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("nav-open");
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.textContent = open ? "×" : "☰";
    });
  }

  // Animal directory search and filters
  const search = document.getElementById("animal-search");
  const category = document.getElementById("category-filter");
  const status = document.getElementById("status-filter");
  const cards = [...document.querySelectorAll(".directory-card")];
  const count = document.getElementById("result-count");
  const empty = document.getElementById("empty-state");
  function filterAnimals() {
    if (!cards.length) return;
    const q = (search?.value || "").trim().toLowerCase();
    const c = category?.value || "all";
    const s = status?.value || "all";
    let visible = 0;
    cards.forEach(card => {
      const matches = card.dataset.name.includes(q) &&
        (c === "all" || card.dataset.category === c) &&
        (s === "all" || card.dataset.status === s);
      card.hidden = !matches;
      if (matches) visible++;
    });
    if (count) count.textContent = visible;
    if (empty) empty.hidden = visible !== 0;
  }
  [search, category, status].forEach(el => el?.addEventListener("input", filterAnimals));
  [category, status].forEach(el => el?.addEventListener("change", filterAnimals));

  // Species detail modal. Replace/add facts as your dataset grows.
  const animalFacts = {
    "Tiger": ["Panthera tigris", "Forest · grassland · mangrove", "Carnivore", "Asia", "Endangered"],
    "Lion": ["Panthera leo", "Savanna · grassland · open woodland", "Carnivore", "Sub-Saharan Africa; small population in India", "Vulnerable"],
    "Elephant": ["Elephantidae (family)", "Savanna · forest · grassland", "Herbivore", "Africa and South / Southeast Asia", "Varies by species: African savanna and forest elephants are classified separately from the Asian elephant"],
    "Leopard": ["Panthera pardus", "Forest · savanna · mountain", "Carnivore", "Parts of Africa and Asia", "Vulnerable"],
    "Cheetah": ["Acinonyx jubatus", "Open grassland · savanna", "Carnivore", "Mainly Africa; small population in Iran", "Vulnerable"],
    "Giraffe": ["Giraffa camelopardalis (species complex)", "Savanna · open woodland", "Herbivore", "Sub-Saharan Africa", "Assessment varies among recognised species"],
    "Giant Panda": ["Ailuropoda melanoleuca", "Temperate mountain forest", "Mostly bamboo", "Central China", "Vulnerable"],
    "Gray Wolf": ["Canis lupus", "Forest · tundra · grassland", "Carnivore", "North America, Europe and Asia", "Least Concern globally; regional populations vary"],
    "Polar Bear": ["Ursus maritimus", "Arctic sea ice and coastal areas", "Carnivore; mainly seals", "Circumpolar Arctic", "Vulnerable"],
    "Indian Peafowl": ["Pavo cristatus", "Forest edge · scrub · farmland", "Omnivore", "Indian subcontinent", "Least Concern"],
    "Saltwater Crocodile": ["Crocodylus porosus", "Estuaries · rivers · coastal wetlands", "Carnivore", "South and Southeast Asia to northern Australia", "Least Concern globally"],
    "Bottlenose Dolphin": ["Tursiops truncatus", "Coastal and offshore waters", "Carnivore; fish and squid", "Oceans worldwide, depending on population", "Varies by population"]
  };
  const modal = document.getElementById("animal-modal");
  function closeModal() { if (modal) { modal.classList.remove("is-open"); modal.setAttribute("aria-hidden", "true"); document.body.classList.remove("modal-open"); } }
  document.querySelectorAll(".detail-trigger").forEach(btn => btn.addEventListener("click", () => {
    const name = btn.dataset.animal, facts = animalFacts[name] || ["Information pending", "Not available", "Not available", "Not available", "Check a current assessment"];
    document.getElementById("modal-title").textContent = name;
    document.getElementById("modal-scientific").textContent = facts[0];
    document.getElementById("modal-description").textContent = `${name} is part of a complex ecosystem. Explore its habitat, diet, range and conservation context, and remember that details may vary across populations.`;
    const labels = ["Habitat", "Diet", "Distribution", "Conservation note"];
    const values = [facts[1], facts[2], facts[3], facts[4]];
    document.getElementById("modal-facts").innerHTML = labels.map((label, i) => `<div><small>${label}</small><strong>${values[i]}</strong></div>`).join("");
    modal.classList.add("is-open"); modal.setAttribute("aria-hidden", "false"); document.body.classList.add("modal-open");
  }));
  modal?.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

  // Chat UI demo: wire this form to POST /api/chat (or your team's agreed endpoint).
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");
  const messages = document.getElementById("chat-messages");
  function addMessage(text, who) {
    const row = document.createElement("div");
    row.className = `message-row ${who === "user" ? "user-row" : "assistant-row"}`;
    const avatar = document.createElement("span"); avatar.className = "message-avatar"; avatar.textContent = who === "user" ? "Y" : "W";
    const bubble = document.createElement("div"); bubble.className = "message-bubble";
    const label = document.createElement("p"); label.className = "message-label"; label.textContent = who === "user" ? "YOU" : "WILDLIFEWISE";
    const body = document.createElement("p"); body.textContent = text;
    const time = document.createElement("span"); time.className = "message-time"; time.textContent = "Just now";
    bubble.append(label, body, time); row.append(avatar, bubble); messages.append(row); messages.scrollTop = messages.scrollHeight;
  }
  async function handleChatSubmit(text) {
    addMessage(text, "user");
    chatInput.value = "";
    const typing = document.createElement("div"); typing.className = "typing-indicator"; typing.textContent = "WildlifeWise is thinking…"; typing.id = "typing-indicator"; messages.append(typing);
    // TODO: Replace this demonstration with your backend integration:
    // const response = await fetch("/api/chat", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({question:text}) });
    // const data = await response.json(); const answer = data.answer;
    const answer = demoWildlifeAnswer(text);
    window.setTimeout(() => {
      document.getElementById("typing-indicator")?.remove();
      addMessage(answer, "assistant");
    }, 650);
  }
  chatForm?.addEventListener("submit", e => { e.preventDefault(); const text = chatInput.value.trim(); if (text) handleChatSubmit(text); });
  document.querySelectorAll(".suggestion-chip").forEach(btn => btn.addEventListener("click", () => handleChatSubmit(btn.textContent.trim())));
  function demoWildlifeAnswer(question) {
    const q = question.toLowerCase();
    if (q.includes("tiger")) return "Tigers are threatened by habitat loss, fragmentation, and poaching. Protecting connected habitats and preventing illegal wildlife trade are important conservation measures. This is a demonstration reply; connect the RAG service for sourced, species-specific answers.";
    if (q.includes("panda")) return "Giant pandas feed mainly on bamboo. Habitat protection and connected forest reserves have helped support their recovery, although they remain classified as Vulnerable. This is a demonstration reply; connect the RAG service for sourced answers.";
    if (q.includes("elephant")) return "Elephants communicate through sounds, touch, body language, and low-frequency rumbles. Some calls can travel over long distances. This is a demonstration reply; connect the RAG service for sourced answers.";
    return "Great question! The full assistant will retrieve relevant facts from the wildlife knowledge base and use them to prepare a grounded answer. The chatbot interface is ready—your teammate can now connect the Flask RAG endpoint.";
  }

  // Five-question wildlife quiz
  const quizQuestions = [
    { q: "Which animal is the fastest land animal?", options: ["Lion", "Cheetah", "Horse", "Leopard"], answer: 1, explain: "The cheetah is built for rapid acceleration and short bursts of speed." },
    { q: "What is the scientific name of the tiger?", options: ["Panthera leo", "Panthera tigris", "Canis lupus", "Ursus arctos"], answer: 1, explain: "Panthera tigris is the scientific name of the tiger." },
    { q: "What is the main food of a giant panda?", options: ["Fish", "Insects", "Bamboo", "Grass"], answer: 2, explain: "Giant pandas feed mostly on bamboo." },
    { q: "Which animal is known for communicating with low-frequency rumbles?", options: ["Elephant", "Peacock", "Fox", "Eagle"], answer: 0, explain: "Elephants use low-frequency calls, among other signals, to communicate." },
    { q: "Where do polar bears mainly live?", options: ["Antarctic", "Amazon rainforest", "Arctic", "Sahara"], answer: 2, explain: "Polar bears live across the Arctic region and depend on sea ice." }
  ];
  const qText = document.getElementById("quiz-question");
  if (qText) {
    let index = 0, score = 0, selected = false;
    const optionsEl = document.getElementById("quiz-options"), next = document.getElementById("quiz-next");
    const feedback = document.getElementById("quiz-feedback"), progress = document.getElementById("quiz-progress");
    function renderQuestion() {
      selected = false; const item = quizQuestions[index];
      document.getElementById("quiz-progress-label").textContent = `QUESTION ${String(index + 1).padStart(2, "0")} / ${String(quizQuestions.length).padStart(2, "0")}`;
      document.getElementById("quiz-score").textContent = score;
      qText.textContent = item.q; feedback.textContent = "Choose an answer to continue."; next.disabled = true; next.textContent = index === quizQuestions.length - 1 ? "See my result →" : "Next question →";
      progress.style.width = `${(index / quizQuestions.length) * 100}%`;
      optionsEl.innerHTML = "";
      item.options.forEach((option, i) => {
        const button = document.createElement("button"); button.className = "quiz-option"; button.innerHTML = `<span>${String.fromCharCode(65 + i)}</span><b>${option}</b>`;
        button.addEventListener("click", () => {
          if (selected) return; selected = true; const correct = i === item.answer;
          if (correct) score++;
          [...optionsEl.children].forEach((el, j) => { el.disabled = true; if (j === item.answer) el.classList.add("correct"); else if (j === i) el.classList.add("incorrect"); });
          feedback.textContent = `${correct ? "Correct!" : "Not quite."} ${item.explain}`;
          document.getElementById("quiz-score").textContent = score; next.disabled = false;
        }); optionsEl.append(button);
      });
    }
    next.addEventListener("click", () => {
      if (!selected) return;
      if (index < quizQuestions.length - 1) { index++; renderQuestion(); }
      else {
        document.getElementById("quiz-card").hidden = true; document.getElementById("quiz-result").hidden = false;
        document.getElementById("final-score").textContent = `${score} / ${quizQuestions.length}`;
        document.getElementById("result-message").textContent = score === 5 ? "Amazing work! You're a wildlife whiz." : score >= 3 ? "Nice work! Keep exploring and your knowledge will grow." : "Every expert starts with curiosity. Explore the directory and try again!";
        progress.style.width = "100%";
      }
    });
    document.getElementById("quiz-restart")?.addEventListener("click", () => { index = 0; score = 0; document.getElementById("quiz-card").hidden = false; document.getElementById("quiz-result").hidden = true; renderQuestion(); });
    renderQuestion();
  }
});