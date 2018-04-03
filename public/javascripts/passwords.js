

function editclicked(editPassId)
{
	document.getElementById("editPassId").textContent = editPassId;
	document.getElementById("passIdVal").value = editPassId;

	document.getElementById("editName").value = document.getElementById("passName-" + editPassId).textContent;
	document.getElementById("editDescription").value = document.getElementById("passDesc-" + editPassId).textContent;
	document.getElementById("editPass").value = document.getElementById("passPass-" + editPassId).textContent;

	document.getElementById("editUrl").value = document.getElementById("passName-" + editPassId);
}
   
