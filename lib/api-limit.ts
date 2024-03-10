import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import cron from "node-cron";
import { MAX_FREE_COUNTS, GPT3_FREE_COUNTS } from "@/constants";

// Schedule tasks to be run on the server.
cron.schedule('0 22 * * * *', async function() {
  console.log('Cron job started'); // 输出开始执行的日志
  const usersApiLimit = await prismadb.userApiLimit.findMany();

  for (let userApiLimit of usersApiLimit) {
    await prismadb.userApiLimit.update({
      where: { userId: userApiLimit.userId },
      data: { count: 0, gpt3Count: 0 },
    });
  }
  console.log('Cron job finished'); // 输出执行完成的日志
});

export const incrementApiLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { 
      userId
    },
  });

  if (userApiLimit) {
    await prismadb.userApiLimit.update({
      where: { userId: userId },
      data: { count: userApiLimit.count + 1 },
    });
  } else {
    await prismadb.userApiLimit.create({
      data: { userId: userId, count: 1, gpt3Count: 0 },
    });
  }
};

export const incrementGpt3ApiLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { 
      userId
    },
  });

  if (userApiLimit) {
    await prismadb.userApiLimit.update({
      where: { userId: userId },
      data: { gpt3Count: userApiLimit.gpt3Count + 1 },
    });
  } else {
    await prismadb.userApiLimit.create({
      data: { userId: userId, count: 0, gpt3Count: 1 },
    });
  }
}

export const checkApiLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { 
      userId: userId 
    },
  });

  if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
    return true;
  } else {
    return false;
  }
};

export const checkGpt3ApiLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { 
      userId: userId 
    },
  });

  if (!userApiLimit || userApiLimit.gpt3Count < GPT3_FREE_COUNTS) {
    return true;
  } else {
    return false;
  }
};

export const getApiLimitCount = async () => {
  const { userId } = auth();

  if (!userId) {
    return 0;
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId
    }
  });

  if (!userApiLimit) {
    return 0;
  }

  return userApiLimit.count;
};

export const getGpt3ApiLimitCount = async () => {
  const { userId } = auth();

  if (!userId) {
    return 0;
  }

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId
    }
  });

  if (!userApiLimit) {
    return 0;
  }

  return userApiLimit.gpt3Count;
};