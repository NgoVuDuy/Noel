(() => {
	const $ = document.querySelector.bind(document);

	let timeRotate = 7000; //7 giây
	let currentRotate = 0;
	let isRotating = false;
	const wheel = $('.wheel');
	const btnWheel = $('.btn--wheel');
	const showMsg = $('.msg');

	//=====< Danh sách phần thưởng >=====
	let listGift = [
		{
			id: 1,
			text: 'Móc khóa',
			percent: 20 / 100,
		},
		{
			id: 2,
			text: 'Quà bí mật',
			percent: 60 / 100,
		},
		{
			id: 3,
			text: 'Son dưỡng',
			percent: 10 / 100,
		},
		{
			id: 4,
			text: 'Gấu bông',
			percent: 10 / 100,
		}
	];

	//=====< Số lượng phần thưởng >=====
	const size = listGift.length;

	//=====< Số đo góc của 1 phần thưởng chiếm trên hình tròn >=====
	const rotate = 360 / size;

	//=====< Số đo góc cần để tạo độ nghiêng, 90 độ trừ đi góc của 1 phần thưởng chiếm >=====
	const skewY = 90 - rotate;
	// Giá trị khởi tạo đưa lên local 
	// let gift_1

	listGift.map((item, index) => {
		//=====< Tạo thẻ li >=====
		const elm = document.createElement('li');

		//=====< Xoay và tạo độ nghiêng cho các thẻ li >=====
		elm.style.transform = `rotate(${
			rotate * index
		}deg) skewY(-${skewY}deg)`;

		//=====< Thêm background-color so le nhau và căn giữa cho các thẻ text>=====
		elm.innerHTML = `<p style="transform: skewY(${skewY}deg) rotate(${rotate / 2}deg);" class="text text-${index + 1}"><b>${item.text}</b></p>`;

		//=====< Thêm vào thẻ ul >=====
		wheel.appendChild(elm);
	});

	/********** Hàm bắt đầu **********/
	const start = () => {
		showMsg.innerHTML = '';
		isRotating = true;
		//=====< Lấy 1 số ngầu nhiên 0 -> 1 >=====
		const random = Math.random();

		//=====< Gọi hàm lấy phần thưởng >=====
		const gift = getGift(random);

		//=====< Số vòng quay: 360 độ = 1 vòng (Góc quay hiện tại) >=====
		currentRotate += 360 * 10;

		//=====< Gọi hàm quay >=====
		rotateWheel(currentRotate, gift.index);

		//=====< Gọi hàm in ra màn hình >=====
		showGift(gift);
	};

	/********** Hàm quay vòng quay **********/
	const rotateWheel = (currentRotate, index) => {
		$('.wheel').style.transform = `rotate(${
			//=====< Góc quay hiện tại trừ góc của phần thưởng>=====
			//=====< Trừ tiếp cho một nửa góc của 1 phần thưởng để đưa mũi tên về chính giữa >=====
			currentRotate - index * rotate - rotate / 2
		}deg)`;
	};
	
	/********** Hàm lấy phần thưởng **********/
	const getGift = randomNumber => {
		let currentPercent = 0;
		let list = [];

		listGift.forEach((item, index) => {
			//=====< Cộng lần lượt phần trăm trúng của các phần thưởng >=====
			currentPercent += item.percent;

			//=====< Số ngẫu nhiên nhỏ hơn hoặc bằng phần trăm hiện tại thì thêm phần thưởng vào danh sách >=====
			if (randomNumber <= currentPercent) {
				list.push({ ...item, index });
			}
		});

		//=====< Phần thưởng đầu tiên trong danh sách là phần thưởng quay được>=====
		return list[0];
	};

	/********** In phần thưởng ra màn hình **********/
	const btn = document.querySelector(".btn-sm")

	const form = document.querySelector(".form-container")

	const formLetter = document.querySelector(".form-container .form-letter")

	// console.log(formLetter)

	const main = document.getElementById("main")

	// lấy các thẻ input
	const inputs = document.querySelectorAll("input")
	console.log(inputs)
	// lấy các thẻ seletion
	// const seletions = document.querySelectorAll("seletion")
	// lấy thẻ textarea 
	const textarea = document.querySelectorAll("textarea")
	
	const html = document.querySelector("html")

	var radioButtons = document.getElementsByName('way');

	console.log(radioButtons)
	
	btn.addEventListener('click', function(event) {
		
		var selectedSchool = "";
	
		for (var i = 0; i < radioButtons.length; i++) {
			if (radioButtons[i].checked) {
				selectedSchool = radioButtons[i].value;
				break;
			}
		}
		if(selectedSchool == "tructiep") {
			event.preventDefault()
			form.style.display = "none"
			main.style.display = "block"
			html.style.overflow = "hidden"
			// window.location.href = "vongquay/rotation.html"
		}
	})
	const showGift = gift => {
		let timer = setTimeout(() => {
			isRotating = false;

			// showMsg.innerHTML = `Chúc mừng bạn đã nhận được "${gift.text}"`;
			Swal.fire({
				title: `Chúc mừng bạn đã trúng ${gift.text}`,
				background: 'rgb(115, 149, 198)',
				color: "white"
			
			
			}).then((result) => {
				if(result.isConfirmed) {
					// localStorage.setItem("gift", gift.text)
                
				var newInput = document.createElement("input");
				newInput.setAttribute("type", "text");
				newInput.setAttribute("name", "gift");
				newInput.value = gift.text;
				formLetter.appendChild(newInput);
				formLetter.submit();
				//window.location.reload()
				//console.log(listGift)
				}
			})

			clearTimeout(timer);
		}, timeRotate);
	};

	/********** Sự kiện click button start **********/
	btnWheel.addEventListener('click', () => {
		!isRotating && start();
	});
	// function getGiftSever() {
		
	// 	let arrGift = []
	
	// 	fetch('http://localhost/WebNoel/getGift.php')
	// 	  .then(response => response.json())
	// 	  .then(data => {
	// 		// Duyệt qua mỗi đối tượng trong mảng
	// 		data.forEach(gift => {
	// 		  // Lấy thông tin từ mỗi đối tượng
	// 		  arrGift.push(gift)
	// 		});
	// 	}).catch(error => console.error('Error:', error));
	// 	return arrGift
	// }
	// console.log(getGiftSever())
	// getGiftSever().forEach((item) => {
		// 	// Nếu mảng có gấu bông
		// 	console.log(item)
		// 	if(item.TrungThuong == 'Gấu bông') {
			// 		// Đặt tỉ lệ trúng bằng 0
			// 		listGift[3].percent = 0;
			// 		// Tăng tỉ lệ quà bí mật
			// 		listGift[1].percent += 0.1
			// 	}
			// 	// Nếu mảng có son dưỡng
			// 	if(item.TrungThuong == 'Son dưỡng') {
				// 		// Đặt tỉ lệ trúng bằng 0
				// 		listGift[2].percent = 0
				// 		// Tăng tỉ lệ quà bí mật
				// 		listGift[1].percent += 0.1
				// 	}
				// 	// Nếu mãng đã có 20 móc khóa
	// 	if(!checkMk()) {
	// 		// Đặt tỉ lệ trúng về 0
	// 		listGift[0].percent = 0
	// 		// Tăng tỉ lệ trúng quà bí mật
	// 		listGift[1].percent += 0.2
	// 	}
	// })
	
	async function checkMk() {
		let countMK = 0;
		const gifts = await getGiftSever();
	
		for (const item of gifts) {
			if (item.TrungThuong == 'Gấu bông') {
				countMK++;
				if (countMK === 20) {
					return false;
				}
			}
		}
		
		return true;
	}
	
	async function getGiftSever() {
		try {
			const response = await fetch('http://localhost/WebNoel/getGift.php');
			const data = await response.json();
			
			let arrGift = [];
			data.forEach(gift => {
				arrGift.push(gift);
			});
			
			return arrGift;
		} catch (error) {
			console.error('Error:', error);
			return [];
		}
	}
	
	async function processGiftData() {
		const gifts = await getGiftSever();
	
		gifts.forEach(item => {
			// Nếu mảng có gấu bông
			console.log(item);
			if (item.TrungThuong == 'Gấu bông') {
				// Đặt tỉ lệ trúng bằng 0
				listGift[3].percent = 0;
				// Tăng tỉ lệ quà bí mật
				listGift[1].percent += 0.1;
			}
			// Nếu mảng có son dưỡng
			if (item.TrungThuong == 'Son dưỡng') {
				// Đặt tỉ lệ trúng bằng 0
				listGift[2].percent = 0;
				// Tăng tỉ lệ quà bí mật
				listGift[1].percent += 0.1;
			}
			// Nếu mãng đã có 20 móc khóa
			if (!checkMk()) {
				// Đặt tỉ lệ trúng về 0
				listGift[0].percent = 0;
				// Tăng tỉ lệ trúng quà bí mật
				listGift[1].percent += 0.2;
			}
		});
	}
	
	processGiftData();
	console.log(listGift)
	  
})();


