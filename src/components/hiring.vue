<!--
@Author: Adam Oberg <Adam>
@Date:   2020-05-15 T2:00:00-03:00
@Email:  adam.oberg@oregonstate.edu
@Last modified by:   Adam
@Last modified time: 2020-05-16 T04:30-06:00PM
-->
<template>
  <el-row class="sus-main" type="flex" justify="center" align="middle">
    <el-col class="content"> </el-col>
    <video autoplay muted loop id="Sus-bkg-video">
      <source src="images/video.mp4" type="video/mp4" />
    </video>
    <el-col type="flex" class="text-content" justify="center" align="middle">
      <el-row class="sus-title">
        <el-col class="sus-title"> Sustainability at OSU is hiring!</el-col>
      </el-row>
      <el-row class="sus-hiring-info">
        <el-col span="12">
          <img
            class="hiring-img"
            src="@/assets/assessment_and_planning_intern.png"
            alt="Assessment and Planning Intern"
          />
        </el-col>
        <el-col span="12">
          <img
            class="hiring-img"
            src="@/assets/student_engagement_intern.png"
            alt="Student Engagement Intern"
          />
        </el-col>
      </el-row>
      <el-row type="flex" align="middle" class="sus-info">
        <el-col span="12" class="sus-info">
          The OSU Sustainability Office is now hiring two student employees.
          Applications are due April 14. Follow the QR code to learn more and
          apply! For alternative formats or accommodations related to a
          disability, or for any questions, please contact
          sustainability@oregonstate.edu
        </el-col>
        <el-col span="12" class="qr-code">
          <img src="@/assets/qr-code_hiring_apr_2024-test.png" alt="QR Code" />
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.sus-main {
  position: fixed;
  left: 0;
  bottom: 0;
  min-width: 100%;
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  margin: 0px;
  padding: 0px;
  z-index: 0;
}

/* Style the video: 100% width and height to cover the entire window */
video {
  position: fixed;
  left: 0;
  bottom: 0;
  min-width: 100%;
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  margin: 0px;
  padding: 0px;
  z-index: -2;
}
.content {
  position: fixed;
  left: 0;
  bottom: 0;
  min-width: 100%;
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  margin: 0px;
  padding: 0px;
  background: rgba(0, 0, 0, 0.5);
  z-index: -1;
}
.text-content {
  font-size: $--font-size-large;
  position: fixed;
  display: block;
  font-family: StratumNo2;
  color: $--color-white;
  padding: 20px;
}
.sus-title {
  color: $--color-white;
  font-size: 1.9em;
  margin-top: 30px;
}
.sus-info {
  color: $--color-white;
  font-size: 1.2em;
}
.button-links {
  margin: 10px;
}
#myBtn {
  margin: 20px;
  font-size: 18px;
  padding: 10px;
  height: 4em;
  border: 1px solid $--color-white;
  background: rgba(0, 0, 0, 0);
  color: $--color-white;
  cursor: pointer;
}
#myBtn:hover {
  background: $--color-white;
  color: $--color-black;
}

.el-row {
  margin-bottom: 20px;
}

.hiring-img {
  width: 95%;
  border-radius: 5px;
}
</style>
