#include <stdio.h>
#include "FacComputer.h"

static FacComputer FacComputer_Object;
void rt_OneStep(void);
void rt_OneStep(void)
{
  static boolean_T OverrunFlag{ false };

  if (OverrunFlag) {
    return;
  }

  OverrunFlag = true;
  FacComputer_Object.step();
  OverrunFlag = false;
}

int_T main(int_T argc, const char *argv[])
{
  (void)(argc);
  (void)(argv);
  FacComputer_Object.initialize();
  printf("Warning: The simulation will run forever. "
         "Generated ERT main won't simulate model step behavior. "
         "To change this behavior select the 'MAT-file logging' option.\n");
  fflush((nullptr));
  while (1) {
  }

  FacComputer_Object.terminate();
  return 0;
}
