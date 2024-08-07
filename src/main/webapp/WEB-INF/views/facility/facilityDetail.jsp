<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="kr">
<head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>S치킨-그룹웨어</title>
<c:import url="../template/head.jsp" />

<style>
.overflow-auto::-webkit-scrollbar-thumb:hover {
	background: #555;
}

.list-group-item {
	line-height: 0.8; /* 라인 높이 설정 */
}
</style>

</head>

<body>
	<!-- 소스 다운 -->
	<script src="https://unpkg.com/@yaireo/tagify"></script>
	<!-- 폴리필 (구버젼 브라우저 지원) -->
	<script
		src="https://unpkg.com/@yaireo/tagify/dist/tagify.polyfills.min.js"></script>
	<link href="https://unpkg.com/@yaireo/tagify/dist/tagify.css"
		rel="stylesheet" type="text/css" />

	<!-- ======= Header ======= -->
	<c:import url="../template/header.jsp" />
	<!-- ======= Sidebar ======= -->
	<c:import url="../template/sidebar.jsp" />
	<main id="main" class="main">
		<div class="pagetitle">
			<h1>${facility}예약목록</h1>
		</div>
		<section class="section">

			<div class="row justify-content-center">
				<div class="col-8">
					<div class="card">
						<div class="card-body">
							<div class="mt-3 mb-3">
								<h1 class="title">회의실 A</h1>
							</div>

							<div id="carouselExampleRide" class=" carousel slide  col-11"
								data-bs-ride="true" style="margin: 0 auto;">
								<div class="carousel-inner">
									<c:forEach begin="1" end="3">
										<div class="carousel-item active " data-bs-interval="2000">
											<img
												src="https://cdn.pixabay.com/photo/2017/03/28/12/11/chairs-2181960_1280.jpg"
												class="d-block w-100" alt="...">
										</div>
									</c:forEach>
								</div>
								<button class="carousel-control-prev" type="button"
									data-bs-target="#carouselExampleRide" data-bs-slide="prev">
									<span class="carousel-control-prev-icon" aria-hidden="true"></span>
									<span class="visually-hidden">Previous</span>
								</button>
								<button class="carousel-control-next" type="button"
									data-bs-target="#carouselExampleRide" data-bs-slide="next">
									<span class="carousel-control-next-icon" aria-hidden="true"></span>
									<span class="visually-hidden">Next</span>
								</button>
							</div>
							<div>
								<h3 class="mintitle mt-3">본관 3층 A-2 구역</h3>
							</div>
						</div>
					</div>

					<div class="card">
						<div class="card-body ms-5 mt-2 facilitybody">
							<span>Lorem Ipsum is simply dummy text of the printing and
								typesetting industry. Lorem Ipsum has been the industry's
								standard dummy text ever since the 1500s, when an unknown
								printer took a galley of type and scrambled it to make a type
								specimen book. It has survived not only five centuries, but also
								the leap into electronic typesetting, remaining essentially
								unchanged. It was popularised in the 1960s with the release of
								Letraset sheets containing Lorem Ipsum passages, and more
								recently with desktop publishing software like Aldus PageMaker
								including versions of Lorem Ipsum.</span>
						</div>
					</div>

					<div class="card" style="margin-bottom: 0">
						<div class="card-body ms-5 mt-3 announcement">
							<span>● 수용인원 최소 1명 ~ 최대 10명</span>
						</div>
					</div>


				</div>

				<div class="col-4">
					<div class="card">

						<div>
							<h4 class="facilityday">예약 일시</h4>
						</div>


						<div class="d-flex">
							<div class="form-group col-5" style="margin-left: 30px;">
								<label for="birth" class="form-label"
									style="font-size: 80%; margin-bottom: 0;">start Date</label> <input
									id="birth" type="date" class="form-control mt-0">
							</div>

							<div class="form-group col-5" style="margin-left: 10px;">
								<label for="birth" class="form-label"
									style="font-size: 80%; margin-bottom: 0;">end Date</label> <input
									id="birth" type="date" class="form-control mt-0">
							</div>
						</div>



						<div class="facilityday">예약 시간</div>
						<div class="d-flex">
							<div class="col-1"></div>
							<div class="col-2 listcheckbox">&nbsp;</div>
							<span class="facilitySpan">&nbsp;예약 불가</span>
							<div class="col-2"></div>
							<div class="col-2 listcheckbox2">&nbsp;</div>
							<span class="facilitySpan"> 예약 가능</span>
						</div>

						<!-- 시간  비동기 식으로 구현 필요-->
						<div class="d-flex justify-content-center">
							<div class="col-3 listcheckbox text-center">09:00</div>
							<div class="col-3 listcheckbox text-center">10:00</div>
							<div class="col-3 listcheckbox text-center">11:00</div>
						</div>

						<div class="d-flex justify-content-center ">
							<div class="col-3 listcheckbox2 text-center">12:00</div>
							<div class="col-3 listcheckbox2 text-center">13:00</div>
							<div class="col-3 listcheckbox2 text-center">14:00</div>
						</div>

						<div class="d-flex justify-content-center ">
							<div class="col-3 listcheckbox2 text-center">15:00</div>
							<div class="col-3 listcheckbox2 text-center">16:00</div>
							<div class="col-3 listcheckbox2 text-center">17:00</div>
						</div>

						<div class="d-flex justify-content-center ">
							<div class="col-3 listcheckbox2 text-center">18:00</div>
							<div class="col-3 listcheckbox2 text-center">19:00</div>
							<div class="col-3 listcheckbox2 text-center">20:00</div>
						</div>


						<div class="mt-1">
							<div class="ms-5 mb-3 d-flex align-middle">
								<select class="form-select form-select-sm w-50"
									aria-label="Small select example">
									<option selected>부서선택</option>
									<option value="1">영업팀</option>
									<option value="2">인사팀</option>
									<option value="3">식품개발팀</option>
								</select> <input type="checkbox" class="ms-2 mx-2" /> <label
									style="font-weight: bold; font-size: 90%; margin-top: 1.4%">
									전체선택</label>
							</div>

						</div>

						<div class="ms-5 mx-5 mb-3 overflow-auto"
							style="max-height: 150px;">

							<ul class="list-group" style="list-style: none;">
								<c:forEach begin="1" end="20">
									<li class="list-group-item"><input type="checkbox" />
										asdasd</li>
								</c:forEach>
							</ul>
						</div>

						<!-- 리스트 체크시 들어가는 태그 -->
						<div></div>


						<div class="text-center mb-3">
							<button class="btn btn-primary col-2">예약</button>
						</div>


					<!-- 해당시설에 예약한 모든 리스트 출력  -->
						<div class="mb-1 ms-5" style="font-weight: bold">해당시설 예약목록</div>
						<div class="ms-5 mx-5 mb-3 overflow-auto"
							style="max-height: 150px;">
							<ul class="list-group" style="list-style: none;">
								<c:forEach begin="1" end="20">
									<li class="list-group-item"><input type="checkbox" />
										asdasd</li>
								</c:forEach>
							</ul>
						</div>

						<!-- 본인것만 취소가 가능  -->
						<div class="text-center mb-3">
							<button class="btn btn-primary col-2">취소</button>
						</div>


					</div>
				</div>
			</div>

		</section>
	</main>
	<!-- End #main -->
	<!-- ======= Footer ======= -->
	<c:import url="../template/footer.jsp" />
	<!-- ======= Script ======= -->
	<c:import url="../template/script.jsp" />
</body>
</html>