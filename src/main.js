import './style.css';

document.getElementById('rsvp-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    attending: document.getElementById('attending').value === 'true',
    guests: parseInt(document.getElementById('guests').value),
    dietary_restrictions: document.getElementById('dietary').value
  };

  try {
    const response = await fetch('/api/rsvp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error submitting RSVP');
    }

    alert('RSVP submitted successfully!');
    loadRsvps();
    e.target.reset();
  } catch (error) {
    console.error('Error:', error);
    alert(error.message || 'Error submitting RSVP');
  }
});

async function loadRsvps() {
  try {
    const response = await fetch('/api/rsvps');
    if (!response.ok) {
      throw new Error('Failed to load RSVPs');
    }
    
    const rsvps = await response.json();
    
    const rsvpList = document.getElementById('rsvp-list');
    rsvpList.innerHTML = '<h2>Current RSVPs</h2>' + rsvps.map(rsvp => `
      <div class="rsvp-item">
        <p><strong>${rsvp.name}</strong> (${rsvp.email})</p>
        <p>Attending: ${rsvp.attending ? 'Yes' : 'No'}</p>
        <p>Guests: ${rsvp.guests}</p>
        ${rsvp.dietary_restrictions ? `<p>Dietary: ${rsvp.dietary_restrictions}</p>` : ''}
      </div>
    `).join('');
  } catch (error) {
    console.error('Error loading RSVPs:', error);
    document.getElementById('rsvp-list').innerHTML = '<p class="error">Error loading RSVPs. Please try again later.</p>';
  }
}

loadRsvps();