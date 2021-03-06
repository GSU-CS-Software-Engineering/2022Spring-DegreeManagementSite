import React, { useState, useEffect } from "react";
import axios from "axios";

function DocModalEdit(props) {
	var isActive = props.isActive;
	var docNameBody = document.getElementById(`docName${props.docId}`);
	var docDescBody = document.getElementById(`docDescription${props.docId}`);
	var pfUrlBody = document.getElementById(`pfUrl${props.docId}`);

	const [docName, setDocName] = useState("");
	const [description, setDescription] = useState("");
	const [pfUrl, setPfUrl] = useState("");

	//Active switch styling
	const toggleStyle = `
	input:checked ~ .dot {
		transform: translateX(100%);
	
	  }
	  input:checked ~ .block {
		background-color: #4ade80;
	  }

	`;

	//Handles clicking save
	async function handleSaveClick(e) {
		e.preventDefault();
		console.log(docName, description, pfUrl, isActive);
		let docUpdateData = { isActive: isActive };
		if (docName) docUpdateData["name"] = docName;
		if (description) docUpdateData["description"] = description;
		if (pfUrl) docUpdateData["powerFormUrl"] = pfUrl;
		console.log(docUpdateData);
		try {
			let res = await axios.put(
				`/document/update/${props.docId}`,
				docUpdateData
			);
			console.log(res);
			window.location.reload();
		} catch (err) {
			console.error(err);
		}
	}

	//Clears inputs on cancel
	function handleCancel() {
		docNameBody.value = props.name;
		docDescBody.value = props.description;
		pfUrlBody.value = props.pfUrl;
	}

	//Active switch componentt
	function ActiveSwitch() {
		if (isActive) {
			return (
				<input
					type="checkbox"
					defaultChecked
					id={`activeToggle${props.docId}`}
					class="sr-only"
					onClick={toggleActiveText}
				/>
			);
		} else {
			return (
				<input
					type="checkbox"
					id={`activeToggle${props.docId}`}
					class="sr-only"
					onClick={toggleActiveText}
				/>
			);
		}
	}

	//Active switch toggle functionality
	function toggleActiveText() {
		isActive = !isActive;
	}

	return (
		<div
			className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
			id={`editModal${props.docId}`}
			data-bs-keyboard="false"
			data-bs-backdrop="static"
			tabIndex="-1"
			aria-labelledby={`editModal${props.docId}`}
			aria-hidden="true"
		>
			<div className="modal-dialog modal-dialog-centered relative w-auto pointer-events-none">
				<div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current dark:bg-stone-800">
					<div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-m dark:border-stone-700">
						<h5
							className="text-xl font-medium leading-normal text-gray-800 dark:text-white"
							id="editModalTitle"
						>
							Edit Document
						</h5>
						<button
							type="button"
							className="btn-close box-content w-4 h-4 p-1 text-white border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-white hover:opacity-75 hover:no-underline"
							data-bs-dismiss="modal"
							aria-label="Close"
							onClick={handleCancel}
						>
							<svg
								className="w-5 h-5"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clipRule="evenodd"
								></path>
							</svg>
						</button>
					</div>
					<div className="modal-body relative p-4" id="editModalBody">
						<form
							className="grid grid-cols-1 justify-center items-center"
							onSubmit={handleSaveClick}
						>
							<div className="flex space-x-4 mb-2 w-full">
								<div className="grid w-10/12">
									<label id="docNameLabel" className="font-semibold mb-1">
										Name
									</label>
									<input
										type="text"
										id={`docName${props.docId}`}
										name="docName"
										className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 focus:ring-green-500 bg-gray-200 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:border-transparent"
										placeholder="Document Title"
										defaultValue={props.name}
										onChange={(e) => setDocName(e.target.value)}
									/>
								</div>
								<div className="grid">
									<style>{toggleStyle}</style>
									<label
										id={`docActiveLabel${props.docId}`}
										class="activeLabel font-semibold"
									>
										Active
									</label>
									<label class="flex items-center cursor-pointer">
										<div class="relative flex items-center">
											<ActiveSwitch />
											<div class="block bg-gray-600 w-14 h-8 rounded-full"></div>

											<div class="dot absolute left-3 top-1 bg-white w-6 h-6 rounded-full transition transform translate-x-[0.3rem]"></div>
										</div>
									</label>
								</div>
							</div>
							<div className="grid mb-2">
								<label className="font-semibold">Description</label>
								<textarea
									className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 focus:ring-green-500 bg-gray-200 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2  focus:border-transparent"
									id={`docDescription${props.docId}`}
									name="docDescription"
									placeholder="A brief description of the contents and purpose of this document."
									rows="4"
									defaultValue={props.description}
									required
									onChange={(e) => {
										setDescription(e.target.value);
									}}
								/>
							</div>
							<div className="grid mb-2">
								<label className="font-semibold">PowerForm URL</label>
								<input
									type="text"
									id={`pfUrl${props.docId}`}
									name="pfUrl"
									className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 focus:ring-green-500 bg-gray-200 text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2  focus:border-transparent"
									placeholder="Link to DocuSign PowerForm associated with this document."
									defaultValue={props.pfUrl}
									onChange={(e) => {
										setPfUrl(e.target.value);
									}}
								/>
							</div>
							<div className="grid mb-2">
								<label className="font-semibold">Creator</label>
								<input
									type="text"
									id={`creator${props.docId}`}
									name="creator"
									className="cursor-not-allowed rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 focus:ring-green-500 bg-gray-400 text-gray-700 placeholder-gray-700 shadow-sm text-base focus:outline-none focus:ring-2  focus:border-transparent"
									placeholder={props.creator}
									disabled
								/>
							</div>
						</form>
					</div>
					<div
						id="editModalFooter"
						className="relative modal-footer flex flex-shrink-0 flex-wrap items-center p-4 border-t border-gray-200 rounded-b-md dark:border-stone-700 justify-end"
					>
						<button
							className="mx-5 w-1/6 px-4 h-10 whitespace-nowrap  bg-stone-500 hover:bg-stone-600 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none rounded-lg"
							data-bs-dismiss="modal"
							aria-label="Close"
							onClick={handleCancel}
						>
							Cancel
						</button>
						<button
							className="w-1/6 px-4 h-10 whitespace-nowrap bg-green-600 hover:bg-green-700 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none rounded-lg"
							onClick={handleSaveClick}
						>
							Save
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DocModalEdit;
